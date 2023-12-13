import express from "express";
import { Credit, CreditTypeEnum } from "../../orm/model/Credit/Credit";
import { User } from "../../orm/model/User/User";
import moment from "moment";
import {sendPushNotification} from "../../core/firebase";

const router = express.Router();

enum revenue_cat_event_enum {
  TEST = "TEST",
  INITIAL_PURCHASE = "INITIAL_PURCHASE",
  RENEWAL = "RENEWAL",
  CANCELLATION = "CANCELLATION",
  UNCANCELLATION = "UNCANCELLATION",
  NON_RENEWING_PURCHASE = "NON_RENEWING_PURCHASE",
  SUBSCRIPTION_PAUSED = "SUBSCRIPTION_PAUSED",
  EXPIRATION = "EXPIRATION",
  BILLING_ISSUE = "BILLING_ISSUE",
  PRODUCT_CHANGE = "PRODUCT_CHANGE",
  TRANSFER = "TRANSFER",
  SUBSCRIPTION_EXTENDED = "SUBSCRIPTION_EXTENDED",
}

enum revenue_cat_product_id {
  WEEKLY = "com.univenn.weekly",
  MONTHLY = "com.univenn.monthly",
  ONE_TIME = "com.univenn.one_time",
}
const creditConfig = {
  [revenue_cat_event_enum.INITIAL_PURCHASE]: {
    [revenue_cat_product_id.WEEKLY]: 7,
    [revenue_cat_product_id.MONTHLY]: 30,
  },
  [revenue_cat_event_enum.RENEWAL]: {
    [revenue_cat_product_id.WEEKLY]: 7,
    [revenue_cat_product_id.MONTHLY]: 30,
  },
  [revenue_cat_event_enum.NON_RENEWING_PURCHASE]: {
    [revenue_cat_product_id.ONE_TIME]: 1,
  },
};
router.post("/", async (req, res) => {
  const user_id = req.body.original_app_user_id;
  const event_type: revenue_cat_event_enum = req.body.type;
  const product_id = req.body.product_id;
  const event_id = req.body.id;
  const user = await User.findOne({where:{id:user_id}})
  try {
    const user = await User.findOne({ where: { id: user_id } });
    const creditAmount = creditConfig[event_type]?.[product_id];

    if (event_type == revenue_cat_event_enum.EXPIRATION) {
      user!.isPremium = false;
      await user?.save();
    }

    if(event_type == revenue_cat_event_enum.BILLING_ISSUE) {
      return res.status(402).json({message:"We were unable to renew your subscription, please review your payment method."})
    }

    if (creditAmount !== undefined) {
      await giveCredit(user!, creditAmount, event_id);
      user!.isPremium = true;
      await user?.save();
    }
    await sendPushNotification(user?.fcmId,"Subscription processed successfully","Now u can enjoy our app.")
    res.status(200).json({ message: "Subscription processed successfully" });
  } catch (error) {
    console.error("Error processing subscription:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

async function giveCredit(
  user: User,
  amount: number,
  revenue_cat_event_id: string
) {
  const credit = new Credit();
  credit.amount = 1;
  credit.rcEventId = revenue_cat_event_id;
  credit.date = moment().toDate();
  credit.user = user!;
  credit.type = CreditTypeEnum.TRAIN;
  await credit.save();
  for (let i = 0; i < amount; i++) {
    const credit = new Credit();
    credit.user = user;
    credit.amount = 1;
    credit.rcEventId = revenue_cat_event_id;
    credit.type = CreditTypeEnum.PREDICT;
    credit.date = moment().add(i, "days").toDate();

    await credit.save();
  }
}

export default router;
