import { Style } from "../../orm/model/Style/Style";
import { ReplicatePrediction } from "../../orm/model/Replicate/ReplicatePrediction";
import { In } from "typeorm";
import {checkPermission} from "../../helpers/checkPermission";
import S3Repo from "../../core/aws"
import path from "path";

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
    isFeatured,
    isCollection,
    styleImages,
    styleDetails,
      images,
    details
  },
  context
) {
  checkPermission(context.user.role)
  const existStyle = await Style.findOne({ where: { name: name } });
  if (existStyle) throw new Error("exist style");
  const uplodPath = process.env.API_UPLOAD_END_POINT




  const lastImgPath = images.map(name => uplodPath + name)
  console.log(lastImgPath)
  const style = new Style();
  style.name = name;
  style.banner = `${uplodPath}${banner}`;
  style.description = description;
  style.isFeatured = isFeatured;
  style.isCollection = isCollection;
  style.images = lastImgPath
  style.details = details
  const newStyle = await style.save();







  const lastStyleData = await Style.findOne({
    where: { name: name },
    relations: ["prompt"],
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
    isFeatured,
    isCollection,
    styleImages,
    styleDetails,
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
  existingStyle.isFeatured = isFeatured;
  existingStyle.isCollection = isCollection;


  await existingStyle.save();




  const updatedStyleData = await Style.findOne({
    where: { id },

  });


  return updatedStyleData;
}

async function getStyle(_, { styleId }) {
  const style = await Style.findOne({
    where: { id: styleId },

  });
  console.log(style)
  return style;
}

async function getAllStyles(_, { status }) {
  let styles;

  if (status) {


  switch (status) {
    case "POPULAR":
      const predictions = await ReplicatePrediction.find({
        relations: ["style"],
      });
      const styleCounts = predictions.reduce((acc, prediction) => {
        const styleId = prediction.style?.id;
        const createdAt = prediction.createdAt;

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
        order: { createdAt: "DESC" },
      });
      break;

    case "EXPLORE":
      styles = await Style.find({
        order: { createdAt: "ASC" },
      });
      break;

    case "FEATURED":
      styles = await Style.find({
        where: { isFeatured: true },
      });
      break;
  }
  } else {
    styles = await Style.find()
  }
  return styles;
}

async function getAllStylesAdmin(_,__,context) {
  checkPermission(context.user.role)
  const styles = await Style.find({relations:["prompt"]})
  return styles
}
async function deleteStyle(_, { styleId }) {
  const style = await Style.findOne({
    where: { id: styleId },
  });

    await style?.remove();

    return style;

}

