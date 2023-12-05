import { ApolloServer } from "@apollo/server";

const promptTypeDefs = `#graphql


enum GenderEnum {
    MALE
    FEMALE
}

enum SchedulerEnum {
    DDIM 
    DPMSOLVERMULTISTEP 
    K_EULER 
    K_EULER_ANCESTRAL
    KLMS
    PNDM
}


type Prompt {
    id: ID
    prompt: String
    negative_prompt: String
    seeds: [String]
    steps: String
    cfg: String
    scheduler: SchedulerEnum
    gender: GenderEnum
    style_id: String
    style:Style
    createdAt: String
    updatedAt: String

}



# ... Other type definitions if needed ...
`;

export default promptTypeDefs;
