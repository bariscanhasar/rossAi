import express, { json, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServer } from "@apollo/server";
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from "@apollo/server/plugin/landingPage/default";
import { resolvers } from "./schema/typeDefs/index";
import { typeDefs } from "./schema/typeDefs/index";
import { dbCreateConnection } from "./orm/dbCreateConnection";
import Logger from "./core/logger";
import { User } from "./orm/model/User/User";
import { getAccessToken, validateTokenData } from "./auth/authUtils";
import JWT, { JwtPayload } from "./core/jwt";
import { upload } from "./middlewares/upload";
import {ReplicateModel} from "./orm/model/Replicate/ReplicateModel";
import {ReplicatePrediction} from "./orm/model/Replicate/ReplicatePrediction";
import {ReplicatePredictionImage} from "./orm/model/Replicate/ReplicatePredictionImage";


process.on("uncaughtException", (e) => {
  Logger.error(e);
});

dotenv.config();

const app = express();
app.use(express.json({ limit: "50mb" }));
// Increase the payload size limit for URL-encoded data
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://bariscanhasar.com",
      "https://admin.bariscanhasar.com",
    ],
    credentials: true,
  })
);
app.use(morgan("tiny"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/upload", express.static(path.join(__dirname, "../upload")));

(async () => {
  await dbCreateConnection();
})();

app.post("/model", async (req: Request, res: Response) => {
  const replicate_id = req.body.id
  const model = await ReplicateModel.findOne({where:{replicate_id:replicate_id}})
  model!.version = req.body.version!
  const modified_model = await model!.save()


  console.log(req.body);
  res.status(200).send(modified_model);
});

app.post("/prediction", async (req: Request, res: Response) => {

  console.log(req.body);
  res.status(200).send(req.body);
});

app.post("/upload", upload.array("file", 10), (req: Request, res: Response) => {
  try {
    console.log(req.files);
    res.send("File upload successful");
  } catch (err) {
    console.log(err);
  }
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
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
        if (
          req.headers.authorization &&
          !req.path.includes("login") &&
          !req.path.includes("register")
        ) {
          try {
            const token = getAccessToken(req.headers.authorization);
            const payload: JwtPayload = await JWT.validate(token);
            validateTokenData(payload);
            const user = await User.findOne({ where: { id: payload.user_id } });

            return { user };
          } catch (e) {
            console.log(e);
          }
        }
      },
    })
  );
})().catch((err) => console.error(err));

export default app;
