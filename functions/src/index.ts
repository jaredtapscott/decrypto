import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { Request, Response } from "express";

// express imports
import * as express from 'express';
import * as cors from 'cors';

// app imports
import { coinbaseRoutesConfig } from './coinbase/routes-config';

// init firebase app
admin.initializeApp();
const db = admin.firestore();

// Initialize Express App
const app = express();
app.use(express.json())
app.use(cors({ origin: true })); // Automatically allow cross-origin requests
coinbaseRoutesConfig(app)

// Routes
app.post('/', (req: Request, res: Response) => {
  functions.logger.log('app post res: ', req.body )
  return res.status(200).send({message: 'posted', data: req.body});
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
  api: functions.https.onRequest(app), // Expose Express API as a single Cloud Function:
};  