import { User } from "../../orm/model/User/User";
import { ReplicateModel } from "../../orm/model/Replicate/ReplicateModel";
import { ReplicatePrediction } from "../../orm/model/Replicate/ReplicatePrediction";
import { Set } from "../../orm/model/Set/Set";
import { getRepository } from "typeorm";

export const statsResolvers = {
  Query: {
    homePageStats,
  },
  Mutation: {},
};

async function homePageStats() {

  const users = await User.find();
  const models = await ReplicateModel.find();
  const predictions = await ReplicatePrediction.find();
  const sets = await Set.find();
    try {


        const replicatePredictionRepository = getRepository(ReplicatePrediction,"typeorm");

        const currentDate = new Date();
        const startDate = new Date();
        startDate.setDate(currentDate.getDate() - 6); // 6 days ago

        const endDate = new Date();
        endDate.setHours(23, 59, 59, 999);

        const results = await replicatePredictionRepository
            .createQueryBuilder("prediction")
            .select("DATE(prediction.createdAt) as date")
            .addSelect("COUNT(prediction.id) as count")
            .where("prediction.createdAt BETWEEN :startDate AND :endDate", {
                startDate,
                endDate,
            })
            .groupBy("DATE(prediction.createdAt)")
            .getRawMany();

        return {
            userCount:users.length,
            modelCount:models.length,
            predictionCount:predictions.length,
            setCount:sets.length,
            lastSevenDayPredictionCount:results
        }
    }catch (e) {
        console.log(e)
    }




}
