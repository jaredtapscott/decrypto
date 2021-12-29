import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from the NEW Firebase!");
});


/**
 * Creates a document with ID -> uid in the `Users` collection.
 *
 * @param {Object} userRecord Contains the auth, uid and displayName info.
 * @param {Object} context Details about the event.
 */
const createProfile = (userRecord:any, context:any) => {
  const { email, phoneNumber, uid } = userRecord;
  return db
  .collection("Users")
  .doc(uid)
  .set({ email, phoneNumber })
  .catch(console.error);
};


module.exports = {
  authOnCreate: functions.auth.user().onCreate(createProfile),
  helloWorld: helloWorld
};  