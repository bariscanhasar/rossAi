import {Style} from "../../orm/model/Style/Style"
import {StyleDetails} from "../../orm/model/Style/StyleDetails"
import {StyleImages} from "../../orm/model/Style/StyleImages"
import {where} from "sequelize";
export const styleResolvers = {
    Query: {
        get_style,
        get_all_styles
    },
    Mutation: {
        create_style,
        delete_style,
        update_style
    },
};


async function create_style(_, {
    name,
    banner,
    description,
    is_featured,
    is_collection,
    style_images,
    style_details
}) {
    const existStyle = await Style.findOne({where:{name:name}})
    if(existStyle) throw new Error("exist style")
    console.log(`style images: ${style_images}`)
    const style = new Style()
    style.name = name
    style.banner = banner
    style.description = description
    style.is_featured = is_featured
    style.is_collection = is_collection

    const newStyle = await style.save()

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

    const lastStyleData = await Style.findOne({where:{name:name},
        relations:["style_images", "style_details","prompt"]
    })
    return lastStyleData

}

async function update_style(_, {
    id, // assuming you have an 'id' parameter to identify the style to update
    name,
    banner,
    description,
    is_featured,
    is_collection,
    style_images,
    style_details
}) {
    const existingStyle = await Style.findOne({ where: { id } });
    if (!existingStyle) {
        throw new Error("Style not found");
    }

    existingStyle.name = name;
    existingStyle.banner = banner;
    existingStyle.description = description;
    existingStyle.is_featured = is_featured;
    existingStyle.is_collection = is_collection;
    existingStyle.style_images = []
    existingStyle.style_details = []


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
        relations: ["style_images", "style_details"]
    });

    console.log(updatedStyleData);
    return updatedStyleData;
}

async function get_style(_,{
    style_id
}){
        const style = await Style.findOne({where:{id:style_id},relations:["style_images","style_details","prompt"]})
        return style
}

async function get_all_styles(

){
    const styles = await Style.find({order:{created_at: "DESC"}})
    return styles
}



async function delete_style(_,{
    style_id
}){
    const style = await Style.findOne({where:{id:style_id},
        relations:["style_images", "style_details"]
    })
    if(style) {
        style.style_images = []
        style.style_details = []

        await style.save()

        await Style.remove(style)

        await style?.remove()


        return style

    }


}
