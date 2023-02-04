import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import * as cors from "cors";
import * as firebaseAccountCredentials from "./config/index.json";


import * as getAuthorizationToken from './legalinc/authorization/getAuthorizationToken';

admin.initializeApp(functions.config().firebase);

const serviceAccount = firebaseAccountCredentials.firebase as admin.ServiceAccount;

admin.initializeApp(
  { credential: admin.credential.cert(serviceAccount) }
);

export const firestore = admin.firestore()


const whitelist = [
  'http://localhost:4200',
  `${firebaseAccountCredentials.legalinc.key.api}`
];

const corsHandler = cors
  ({

    origin: (origin: any, callback: any) => {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error(`Origin: ${origin} not allowed by CORS!!`))
        // callback(null, true)
      }
    }
  });

module.exports = {
  'getAuthorizationToken': functions.https.onRequest((req: functions.https.Request, res: functions.Response<any>) => {
    corsHandler(req, res, async () => await getAuthorizationToken(req, res))
  }),
}