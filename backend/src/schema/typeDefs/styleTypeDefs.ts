import { ApolloServer } from "@apollo/server";

const styleTypeDefs = `#graphql
type Style {
    id: ID
    name: String
    banner: String
    description: String
    isFeatured: Boolean
    isCollection: Boolean
    styleImages: [StyleImage!]
    styleDetails: [StyleDetail!]
    prompt:[Prompt]
    createdAt: String
    updatedAt: String
  
}

type StyleImage {
    id: ID
    path: String
    createdAt: String
}

type StyleDetail {
    id: ID
    name: String
    createdAt: String
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
