import userTypeDefs from "./userTypeDefs";
import styleTypeDefs from "./styleTypeDefs";
import promptTypeDefs from "./promptTypeDefs";
import {styleResolvers} from "../resolvers/styleResolvers";
import {userResolvers} from "../resolvers/userResolvers";
import {promptResolvers} from "../resolvers/promptResolvers";
import replicateTypeDefs from "./replicateTypeDefs"
import {replicateResolvers} from "../resolvers/replicateResolvers";

export const typeDefs = [
    userTypeDefs,
    styleTypeDefs,
    promptTypeDefs,
    replicateTypeDefs
]

export const resolvers = [
    styleResolvers,
    userResolvers,
    promptResolvers,
    replicateResolvers
]