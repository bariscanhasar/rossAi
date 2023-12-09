import { Style } from "../../orm/model/Style/Style";
import { StyleDetails } from "../../orm/model/Style/StyleDetails";
import { StyleImages } from "../../orm/model/Style/StyleImages";
import { where } from "sequelize";
import { ReplicatePrediction } from "../../orm/model/Replicate/ReplicatePrediction";
import { In } from "typeorm";
import {checkPermission} from "../../helpers/checkPermission";
import {Prompt} from "../../orm/model/Prompt/Prompt";
export const styleResolvers = {
  Query: {
    getStyle,
    getAllStyles,
    getAllStylesAdmin
  },
  Mutation: {
    createStyle,
    deleteStyle,
    updateStyle,
  },
};

async function createStyle(
  _,
  {
    name,
    banner,
    description,
    is_featured,
    is_collection,
    style_images,
    style_details,
  },
  context
) {
  checkPermission(context.user.role)
  const existStyle = await Style.findOne({ where: { name: name } });
  if (existStyle) throw new Error("exist style");
  console.log(`style images: ${style_images}`);
  const style = new Style();
  style.name = name;
  style.banner = banner;
  style.description = description;
  style.is_featured = is_featured;
  style.is_collection = is_collection;

  const newStyle = await style.save();

  for (const path of style_images) {
    const images = new StyleImages();
    images.path = path;
    images.style = newStyle;
    await images.save();
  }

  for (const name of style_details) {
    const details = new StyleDetails();
    details.name = name;
    details.style = newStyle;
    await details.save();
  }

  const lastStyleData = await Style.findOne({
    where: { name: name },
    relations: ["style_images", "style_details", "prompt"],
  });
  return lastStyleData;
}

async function updateStyle(
  _,
  {
    id,
    name,
    banner,
    description,
    is_featured,
    is_collection,
    style_images,
    style_details,
  },
  context
) {
  checkPermission(context.user.role)
  const existingStyle = await Style.findOne({ where: { id } });
  if (!existingStyle) {
    throw new Error("Style not found");
  }

  existingStyle.name = name;
  existingStyle.banner = banner;
  existingStyle.description = description;
  existingStyle.is_featured = is_featured;
  existingStyle.is_collection = is_collection;
  existingStyle.style_images = [];
  existingStyle.style_details = [];

  await existingStyle.save();

  for (const path of style_images) {
    const images = new StyleImages();
    images.path = path;
    images.style = existingStyle;
    await images.save();
  }

  for (const detailName of style_details) {
    const details = new StyleDetails();
    details.name = detailName;
    details.style = existingStyle;
    await details.save();
  }

  const updatedStyleData = await Style.findOne({
    where: { id },
    relations: ["style_images", "style_details"],
  });

  console.log(updatedStyleData);
  return updatedStyleData;
}

async function getStyle(_, { style_id }) {
  const style = await Style.findOne({
    where: { id: style_id },
    relations: ["style_images", "style_details", "prompt"],
  });
  return style;
}

async function getAllStyles(_, { status }) {
  let styles;

  switch (status) {
    case "POPULAR":
      const predictions = await ReplicatePrediction.find({
        relations: ["style"],
      });
      const styleCounts = predictions.reduce((acc, prediction) => {
        const styleId = prediction.style?.id;
        const createdAt = prediction.created_at;

        // @ts-ignore
        const index = acc.findIndex((style) => style.id === styleId);

        if (index === -1) {
          // @ts-ignore
          acc.push({ id: styleId, count: 1 });
        } else {
          // @ts-ignore
          acc[index].count++;
        }

        return acc;
      }, []);

      const latestStyleArray = styleCounts
        // @ts-ignore
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      // @ts-ignore
      const styleIds = latestStyleArray.map((e) => e.id);
      styles = await Style.find({
        where: { id: In(styleIds) },
      });

      styles.sort((a, b) => {
        const indexA = styleIds.indexOf(a.id);
        const indexB = styleIds.indexOf(b.id);
        return indexA - indexB;
      });

      break;

    case "NEWEST":
      styles = await Style.find({
        order: { created_at: "DESC" },
      });
      break;

    case "EXPLORE":
      styles = await Style.find({
        order: { created_at: "ASC" },
      });
      break;

    case "FEATURED":
      styles = await Style.find({
        where: { is_featured: true },
      });
      break;
  }

  return styles;
}

async function getAllStylesAdmin(_,__,context) {
  checkPermission(context.user.role)
  const styles = await Style.find({relations:["prompt"]})
  return styles
}
async function deleteStyle(_, { style_id }) {
  const style = await Style.findOne({
    where: { id: style_id },
    relations: ["style_images", "style_details"],
  });
  if (style) {
    style.style_images = [];
    style.style_details = [];

    await style.save();

    await Style.remove(style);

    await style?.remove();

    return style;
  }
}
