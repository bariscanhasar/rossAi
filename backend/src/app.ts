import express, {json, Request, Response} from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { expressMiddleware } from "@apollo/server/express4";
import {ApolloServer} from "@apollo/server";
import {
    ApolloServerPluginLandingPageLocalDefault,
    ApolloServerPluginLandingPageProductionDefault,
} from "@apollo/server/plugin/landingPage/default";
import {resolvers} from "./schema/typeDefs/index";
import {typeDefs} from "./schema/typeDefs/index";
import { dbCreateConnection } from "./orm/dbCreateConnection";
import Logger from "./core/logger"
import {User} from './orm/model/User/User'
import {getAccessToken,validateTokenData} from "./auth/authUtils";
import JWT, {JwtPayload} from './core/jwt'

process.on('uncaughtException', (e) => {
    Logger.error(e);
});


dotenv.config();

const app = express();

app.use(morgan("tiny"));

app.use(express.json());
app.use(express.urlencoded({extended: true}));



(async () => {
    await dbCreateConnection();
})();


const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
        ApolloServerPluginLandingPageLocalDefault({ includeCookies: true }),
    ],
});

(async () => {
    await server.start();
    //@ts-ignore
    app.use(
        "/graphql",
        cors<cors.CorsRequest>(),
        json(),
        expressMiddleware(server, {
            //@ts-ignore
            context: async ({ req }) => {
                // Skip authentication for login and register routes
                if (req.headers.authorization && !req.path.includes('login') && !req.path.includes('register')) {
                    const token = getAccessToken(req.headers.authorization)
                    const payload: JwtPayload = await JWT.validate(token)
                    validateTokenData(payload)
                    const user = await User.findOne({ where: { id: payload.user_id } })

                    return { user };
                }

            },
        })
    );
})().catch((err) => console.error(err));


export default app;