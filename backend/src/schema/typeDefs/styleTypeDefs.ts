import { ApolloServer } from "@apollo/server";

const styleTypeDefs = `#graphql
type Style {
    id: ID
    name: String
    banner: String
    description: String
    is_featured: Boolean
    is_collection: Boolean
    style_images: [StyleImage!]
    style_details: [StyleDetail!]
    prompt:[Prompt]
    createdAt: String
    updatedAt: String
  
}

type StyleImage {
    id: ID
    path: String
    created_at: String
}

type StyleDetail {
    id: ID
    name: String
    created_at: String
}


scalar Upload

type File {
    filename:String
    mimetype: String
    encoding: String
}



# ... Other type definitions if needed ...
`;

export default styleTypeDefs;
