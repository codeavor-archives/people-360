var admin = require("firebase-admin");

var serviceAccount = require("./asset-management-5f4bd-firebase-adminsdk-8oi5u-ecbb1c1440.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://asset-management-5f4bd.firebaseio.com"
});
// module.exports = auth;
export { admin };
