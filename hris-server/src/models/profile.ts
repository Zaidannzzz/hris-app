import firebase from "firebase/compat/app";

export interface Profile {
  id: string;
  user_id: string; // ID of the corresponding user
  position: string;
  department: string;
  created_at: firebase.firestore.Timestamp;
  updated_at: firebase.firestore.Timestamp;
}
