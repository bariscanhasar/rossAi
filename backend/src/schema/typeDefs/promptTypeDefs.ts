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
    promptText: String
    negativePrompt: String
    seeds: [String]
    steps: String
    cfg: String
    scheduler: SchedulerEnum
    gender: GenderEnum
    styleId: String
    style:Style
    createdAt: Date
    updatedAt: Date

}



# ... Other type definitions if needed ...
`;

export default promptTypeDefs;
