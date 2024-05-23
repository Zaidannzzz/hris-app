import firebase from "firebase/compat/app";

export const converter = <T extends unknown>() => {
  return {
    toFirestore: (data: T) => {
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key) && data[key] === undefined) {
          data[key] = null as any
        }
      }
      return data
    },
    fromFirestore:
      (snap: firebase.firestore.QueryDocumentSnapshot) => {
        return snap.data() as T;
      },
  };
}