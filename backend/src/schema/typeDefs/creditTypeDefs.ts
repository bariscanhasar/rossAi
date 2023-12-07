import { ApolloServer } from "@apollo/server";

const creditTypeDefs = `#graphql

enum CreditTypeEnum {
    TRAIN
    PREDICT
}




type Credit {
    id: ID!
    date: String!
    amount: Int!
    type: CreditTypeEnum!
    user: User
    created_at: String!

}




# ... Other type definitions if needed ...
`;

export default creditTypeDefs;