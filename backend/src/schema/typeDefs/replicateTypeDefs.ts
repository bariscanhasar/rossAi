import { ApolloServer } from "@apollo/server";

const replicateTypeDefs = `#graphql


enum ReplicateStatusEnum {
    starting
    canceled
    failed
    processing
    succeeded
    waiting
}


type ReplicateModel {
    id: ID!
    name: String
    replicateId: String
    version: String
    image: String
    instanceData: String
    status: ReplicateStatusEnum
    gender: GenderEnum
    user: User
    createdAt: Date
    updatedAt: Date
}

type Image {
    id: ID!
    path: String!
    set:Set
    replicateId: String
    createdAt: Date!
    updatedAt: Date!
}
type ReplicatePrediction {
    id: ID!
    replicateId: String!
    status: ReplicateStatusEnum!
    modelId: String!
    promptId: String!
    styleId: String
    model: ReplicateModel!
    prompt: Prompt!
    style: Style
    images: [Image!]!
    createdAt: Date!
    updatedAt: Date!
}
type Set {
    id: ID!
    name: String
    status: ReplicateStatusEnum
    user:User
    images:[Image]
    model: ReplicateModel
    createdAt: Date
    updatedAt: Date
}



`;

export default replicateTypeDefs;
