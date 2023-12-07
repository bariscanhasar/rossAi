import userTypeDefs from "./userTypeDefs";
import styleTypeDefs from "./styleTypeDefs";
import promptTypeDefs from "./promptTypeDefs";
import {styleResolvers} from "../resolvers/styleResolvers";
import {userResolvers} from "../resolvers/userResolvers";
import {promptResolvers} from "../resolvers/promptResolvers";
import replicateTypeDefs from "./replicateTypeDefs"
import {replicateResolvers} from "../resolvers/replicateResolvers";
import creditTypeDefs from "./creditTypeDefs";
import {creditResolvers} from "../resolvers/creditResolvers";
import {setResolvers} from "../resolvers/setResolvers";

export const typeDefs = [
    userTypeDefs,
    styleTypeDefs,
    promptTypeDefs,
    replicateTypeDefs,
    creditTypeDefs
]

export const resolvers = [
    styleResolvers,
    userResolvers,
    promptResolvers,
    replicateResolvers,
    creditResolvers,
    setResolvers
]