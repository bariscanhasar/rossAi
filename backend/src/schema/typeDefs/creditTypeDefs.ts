import { ApolloServer } from "@apollo/server";

const creditTypeDefs = `#graphql

enum CreditTypeEnum {
    TRAIN
    PREDICT
}




type Credit {
    id: ID!
    date: Date!
    amount: Int!
    type: CreditTypeEnum!
    user: User
    createdAt: Date!

}




# ... Other type definitions if needed ...
`;

export default creditTypeDefs;
