import firebase, { getApps, initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
};

const apps = getApps
if (!apps.length) {
  initializeApp(firebaseConfig)
}

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
export const provider = new GoogleAuthProvider();

export const createUser = (email: string, password: string) => {
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("🚀 ~ file: firebase.ts ~ line 31 ~ .then ~ user", user)
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("🚀 ~ file: firebase.ts ~ line 38 ~ createUser ~ errorMessage", errorMessage)
  });
}

export default firebase;