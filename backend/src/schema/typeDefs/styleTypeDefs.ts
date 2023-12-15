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
    createdAt: Date
    updatedAt: Date
  
}

type StyleImage {
    id: ID
    path: String
    createdAt: Date
}

type StyleDetail {
    id: ID
    name: String
    createdAt: Date
}






# ... Other type definitions if needed ...
`;

export default styleTypeDefs;
