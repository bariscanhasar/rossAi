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
import indexTypeDefs from "./typeDefs";

export const typeDefs = [
    userTypeDefs,
    styleTypeDefs,
    promptTypeDefs,
    replicateTypeDefs,
    creditTypeDefs,
    indexTypeDefs
]

export const resolvers = [
    styleResolvers,
    userResolvers,
    promptResolvers,
    replicateResolvers,
    creditResolvers,
    setResolvers,
    statsResolvers
]