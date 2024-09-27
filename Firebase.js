import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCwWK1doKSou3sjLum-6tldpbzBg_3qCJk",
  authDomain: "appmusica-ab80a.firebaseapp.com",
  projectId: "appmusica-ab80a",
  storageBucket: "appmusica-ab80a.appspot.com",
  messagingSenderId: "680628304832",
  appId: "1:680628304832:web:02aff0bb4cb4331e0a6625"
};


const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);