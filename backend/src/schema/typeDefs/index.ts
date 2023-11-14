import userTypeDefs from "./userTypeDefs";
import styleTypeDefs from "./styleTypeDefs";
import promptTypeDefs from "./promptTypeDefs";
import {styleResolvers} from "../resolvers/styleResolvers";
import {userResolvers} from "../resolvers/userResolvers";
import {promptResolvers} from "../resolvers/promptResolvers";

export const typeDefs = [
    userTypeDefs,
    styleTypeDefs,
    promptTypeDefs
]

export const resolvers = [
    styleResolvers,
    userResolvers,
    promptResolvers
]