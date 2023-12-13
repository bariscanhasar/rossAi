var admin = require("firebase-admin");

const serviceAccount = require("../../rossai-404716-firebase-adminsdk-9dmpv-f85b3b6c1d.json")


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
