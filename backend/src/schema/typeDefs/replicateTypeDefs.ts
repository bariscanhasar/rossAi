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
    replicate_id: String
    version: String
    image: String
    instance_data: String
    status: ReplicateStatusEnum
    gender: GenderEnum
    userId: String
    user: User
    created_at: String
    updated_at: String
}

type Image {
    id: ID!
    path: String!
    set:Set
    replicate_id: String
    created_at: String!
    updated_at: String!
}
type ReplicatePrediction {
    id: ID!
    replicate_id: String!
    status: ReplicateStatusEnum!
    prompt_text: String!
    negative_prompt: String
    prompt_steps: String
    prompt_cfg: String
    prompt_scheduler: SchedulerEnum
    prompt_output: String!
    model_id: String!
    prompt_id: String!
    style_id: String
    model: ReplicateModel!
    prompt: Prompt!
    style: Style
    images: [Image!]!
    created_at: String!
    updated_at: String!
}
type Set {
    id: ID!
    name: String!
    status: ReplicateStatusEnum!
    user:User
    images:[Image]
    model: ReplicateModel
    created_at: String!
    updated_at: String!
}
type Query {
    get_user_replicate_model:[ReplicateModel]
    get_all_set:[Set]
    get_set(set_id:String):Set
    get_all_set_admin:[Set]
    get_all_replicate_models:[ReplicateModel]
}


`;

export default replicateTypeDefs;
