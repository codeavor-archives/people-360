const functions = require("firebase-functions");
const stripe = require("stripe")("sk_test_kFqMT25OY1pvH4MeSPKFW3eE00yQ5xvcZI");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });
admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {
  // get the user and add custom claims (admin)
  if (context.auth.token.admin !== true) {
    return { error: "Only admins can add other admins" };
  }
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
  if (context.auth.token.admin !== true) {
    return { error: "Only admins change other passwords" };
  }
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then(user => {
      return admin
        .auth()
        .updateUser(user.uid, {
          password: "123456"
          //   roles: "admin"
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

exports.checkout = functions.https.onRequest((request, response) => {
  return cors(request, response, async () => {
    let myProduct = request.query.products; //products variable is from the Checkout.vue
    // then revert the object data passed from the client to an array
    myProduct = Object.entries(JSON.parse(myProduct));

    // response.send(myProduct);

    const productArray = [];
    myProduct.forEach(item => {
      const p = admin
        .firestore()
        .doc(`preproposals/${item[0]}`)
        .get();
      productArray.push(p);
    });

    const all = await Promise.all(productArray);
    const result = [];

    all.forEach(item => {
      const data = {};
      data.downPayment = parseFloat(item.data().downPayment * 100);
      data.currency = "php";
      data.description = item.data().proposalNumber;
      data.name = item.data().itemPurchase;

      myProduct.forEach(q => {
        if (item.id == q[0]) {
          data.quantity = q[1];
        }
      });
      result.push(data);
    });

    stripe.checkout.sessions.create(
      {
        success_url: "https://example.com/success",
        cancel_url: "https://example.com/cancel",
        payment_method_types: ["card"],
        line_items: result
      },
      function(err, session) {
        response.send(session);
      }
    );
  });
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
