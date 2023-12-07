var admin = require("firebase-admin");

var serviceAccount = require("path/to/rossai-404716-firebase-adminsdk-9dmpv-f85b3b6c1d.json");

const firebaseAdmin = admin.initializeApp({
  credential: serviceAccount,
});

export const sendPushNotification = async (devicepushtoken, title, body) => {
  await firebaseAdmin.messaging().send({
    token: devicepushtoken,
    notification: {
      title,
      body,
    },
  });
};
