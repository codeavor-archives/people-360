const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });
admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {
  // get the user and add custom claims (admin)
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then(user => {
      return admin.auth().setCustomUserClaims(user.uid, {
        admin: true
      });
    })
    .then(() => {
      return {
        message: `Success! ${data.email} has been made an admin`
      };
    })
    .catch(error => {
      console.log("Error fetching user data:", error);
    });
});

exports.newPassword = functions.https.onCall((data, context) => {
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then(user => {
      return admin
        .auth()
        .updateUser(user.uid, {
          // password: "123456"
          roles: "admin"
        })
        .then(() => {
          return {
            message: `Success! ${data.email} has been updated`
          };
        });
    })
    .catch(error => {
      console.log(error);
    });
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
