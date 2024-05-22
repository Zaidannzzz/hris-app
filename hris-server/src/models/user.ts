import firebase from "firebase/compat/app";

interface User {
  id: string;
  name: string;
  email: string;
  password: string; // hashed
  role: 'admin' | 'employee';
  created_at: firebase.firestore.Timestamp;
  updated_at: firebase.firestore.Timestamp;
}
