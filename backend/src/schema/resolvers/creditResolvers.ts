import {Credit} from "../../orm/model/Credit/Credit";
import {User} from "../../orm/model/User/User";
import moment from "moment/moment";

export const creditResolvers = {
    Query: {
        get_user_all_credits,
        get_all_credits
    },
    Mutation: {
        create_one_credit
    },
};


async function get_user_all_credits(_,__,context) {
    const user_id = context.user.id


    const credits = await Credit.find({where:{user:{id:user_id}},relations:["user"]})

    return credits

}

async function get_all_credits(_,__,) {
    const credits = await Credit.find({relations:["user"]})
    console.log("bra")
    return credits
}

async function create_one_credit(_,{user_id,amount,type}) {
    const user = await User.findOne({where:{id:user_id}});
    const currentDate = moment().utc().startOf("day");
    if(!user) return Error("no user")

    const credit  = new Credit()
    credit.amount = amount
    credit.type = type
    credit.user = user
    credit.date = currentDate.toDate()
    await credit.save()

    return credit

}



