import admin from "firebase-admin";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { firebaseConfig } from "./firebase";
import dotenv from "dotenv";

dotenv.config();

const serviceAccount = require('../../../../dev.json');

firebase.initializeApp(firebaseConfig);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  projectId: firebaseConfig.projectId,
});

const db = firebase.firestore();

export default db;
export {
  admin,
  db,
  firebase,
};
