import {Credit} from "../../orm/model/Credit/Credit";
import {User} from "../../orm/model/User/User";
import moment from "moment/moment";
import {checkPermission} from "../../helpers/checkPermission";

export const creditResolvers = {
    Query: {
        getUserAllCredits,
        getAllCreditsAdmin
    },
    Mutation: {
        createOneCredit
    },
};


async function getUserAllCredits(_,__,context) {
    const user_id = context.user.id

    const credits = await Credit.find({where:{user:{id:user_id}},relations:["user"]})

    return credits

}

async function getAllCreditsAdmin(_,__,context) {
    checkPermission(context.user.role)
    const credits = await Credit.find({relations:["user"]})
    return credits
}

async function createOneCredit(_,{userId,amount,creditType},context) {
    checkPermission(context.user.role)
    const user = await User.findOne({where:{id:userId}});
    const currentDate = moment().utc().startOf("day");
    if(!user) return Error("no user")

    const credit  = new Credit()
    credit.amount = amount
    credit.type = creditType
    credit.user = user
    credit.date = currentDate.toDate()
    await credit.save()

    return credit

}



