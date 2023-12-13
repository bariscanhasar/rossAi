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
    createdAt: String
    updatedAt: String
}

type Image {
    id: ID!
    path: String!
    set:Set
    replicateId: String
    createdAt: String!
    updatedAt: String!
}
type ReplicatePrediction {
    id: ID!
    replicateId: String!
    status: ReplicateStatusEnum!
    PromptText: String!
    negativePrompt: String
    promptSteps: String
    promptCfg: String
    PromptScheduler: SchedulerEnum
    promptOutput: String!
    modelId: String!
    promptId: String!
    styleId: String
    model: ReplicateModel!
    prompt: Prompt!
    style: Style
    images: [Image!]!
    createdAt: String!
    updatedAt: String!
}
type Set {
    id: ID!
    name: String
    status: ReplicateStatusEnum
    user:User
    images:[Image]
    model: ReplicateModel
    createdAt: String
    updatedAt: String
}



`;

export default replicateTypeDefs;
