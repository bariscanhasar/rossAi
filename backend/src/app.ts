import express, { json, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled';
import { resolvers } from "./schema";
import { typeDefs } from "./schema";
import { dbCreateConnection } from "./orm/dbCreateConnection";
import Logger from "./core/logger";
import { User } from "./orm/model/User/User";
import { getAccessToken, validateTokenData } from "./auth/authUtils";
import JWT, { JwtPayload } from "./core/jwt";
import { upload } from "./middlewares/upload";
import routes from "./webhooks/index";

// HANDLING UNCAUGHT EXCEPTIONS
process.on("uncaughtException", (e) => {
  Logger.error(e);
});

// ENVIRONMENT VARIABLES
dotenv.config();

const app = express();
app.use(express.json({ limit: "50mb" }));

app.use(express.urlencoded({ limit: "50mb", extended: true }));



app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://bariscanhasar.com",
    ],
    credentials: true,
  })
);
app.use(morgan("tiny"));

app.use(express.json());


app.use(express.urlencoded({ extended: true }));



// STYLE AND PREDICTION IMAGES STATIC.
app.use("/upload", express.static(path.join(__dirname, "../upload")));
app.use(
  "/static",
  express.static(path.join(__dirname, "../prediction_images"))
);


// POSTGRES DB CONNECTION
(async () => {
  await dbCreateConnection();
})();



// WEBHOOKS
app.use("/", routes);

// UPLOAD STYLE IMAGES HERE.
app.post("/upload", upload.array("file", 10), (req: Request, res: Response) => {
  try {
    res.send("File upload successful");
  } catch (e) {
    Logger.error(e)
    console.log(e);
  }
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  introspection: true,
  plugins: [
    // ApolloServerPluginLandingPageDisabled()
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
        if (
          req.headers.authorization &&
          !req.path.includes("login") &&
          !req.path.includes("register")
        ) {
          try {
            const token = getAccessToken(req.headers.authorization);
            const payload: JwtPayload = await JWT.validate(token);
            validateTokenData(payload);
            const user = await User.findOne({ where: { id: payload.userId } });
            if (!user)
              throw new Error("you must be logged in to query this schema");

            return { user };
          } catch (e) {
            console.log(e)
            Logger.error(e)
            return {};
          }
        }
      },
    })
  );
})().catch((err) => console.error(err));

export default app;
