import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as Coinbase from './coinbase';

admin.initializeApp();
const db = admin.firestore();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
const helloWorld = functions.https.onRequest((request, response) => {
  response.set('Access-Control-Allow-Origin', '*');
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send({text: "Hello from the EVEN NEWER Firebase!"});
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
  coinbase: Coinbase,
  helloWorld: helloWorld,
};  