import { ApolloServer } from "@apollo/server";

const replicateTypeDefs = `#graphql


enum ReplicateStatusEnum {
    canceled
    failed
    processing
    succeeded
    waiting
}


type ReplicateModel {
    id: ID!
    name: String
    replicate_id: String
    version: String
    image: String
    instance_data: String
    status: ReplicateStatusEnum
    gender: GenderEnum
    userId: String
    user: User
    createdAt: String
    updatedAt: String
}

type ReplicatePrediction {
    id: ID!
    replicate_id: String!
    status: ReplicateStatusEnum!
    prompt_text: String!
    prompt_negative_prompt: String
    prompt_steps: String
    prompt_cfg: String
    prompt_scheduler: SchedulerEnum
    prompt_output: String!
    model_id: String!
    prompt_id: String!
    set_id: String
    style_id: String
    model: ReplicateModel!
    prompt: Prompt!
    style: Style
    createdAt: String!
    updatedAt: String!
}

type Query {
    get_replicate_model:ReplicateModel
}


`;

export default replicateTypeDefs;
