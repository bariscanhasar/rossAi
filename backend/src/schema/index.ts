import userTypeDefs from "./typeDefs/userTypeDefs";
import styleTypeDefs from "./typeDefs/styleTypeDefs";
import promptTypeDefs from "./typeDefs/promptTypeDefs";
import {styleResolvers} from "./resolvers/styleResolvers";
import {userResolvers} from "./resolvers/userResolvers";
import {promptResolvers} from "./resolvers/promptResolvers";
import replicateTypeDefs from "./typeDefs/replicateTypeDefs"
import {replicateResolvers} from "./resolvers/replicateResolvers";
import creditTypeDefs from "./typeDefs/creditTypeDefs";
import {creditResolvers} from "./resolvers/creditResolvers";
import {setResolvers} from "./resolvers/setResolvers";
import {statsResolvers} from "./resolvers/statsResolvers";
import indexTypeDefs  from "./typeDefs";
import { GraphQLScalarType, Kind } from 'graphql';


export const dateScalar = new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    serialize(value) {
        if (value instanceof Date) {
            const utcDate = new Date(value)
            const formattedDate = utcDate.toLocaleDateString('en-GB')
            return formattedDate // Convert outgoing Date to integer for JSON
        }
        throw Error('GraphQL Date Scalar serializer expected a `Date` object');
    },
    parseValue(value) {
        if (typeof value === 'number') {
            return new Date(value); // Convert incoming integer to Date
        }
        throw new Error('GraphQL Date Scalar parser expected a `number`');
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.INT) {

            // Convert hard-coded AST string to integer and then to Date
            return new Date(parseInt(ast.value, 10));
        }
        // Invalid hard-coded value (not an integer)
        return null;
    },
});

export const typeDefs = [
    userTypeDefs,
    styleTypeDefs,
    promptTypeDefs,
    replicateTypeDefs,
    creditTypeDefs,
    indexTypeDefs
]

export const resolvers = [
    {Date:dateScalar},
    styleResolvers,
    userResolvers,
    promptResolvers,
    replicateResolvers,
    creditResolvers,
    setResolvers,
    statsResolvers
]