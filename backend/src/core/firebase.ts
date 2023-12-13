import admin from "firebase-admin"

var serviceAccount = require("../../rossai-404716-firebase-adminsdk-9dmpv-c06a7e022a.json")



const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export const sendPushNotification = async (fcmId, title, body) => {
  await firebaseAdmin.messaging().send({
    token: fcmId,
    notification: {
      title,
      body,
    },
  });
};
