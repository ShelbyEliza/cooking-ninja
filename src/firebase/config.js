import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const firebaseConfig = {
  apiKey: "AIzaSyBRtPvxH7umG2MbtDhD9r3BA_MQWbxhMls",
  authDomain: "larder-to-table.firebaseapp.com",
  projectId: "larder-to-table",
  storageBucket: "larder-to-table.appspot.com",
  messagingSenderId: "94101149481",
  appId: "1:94101149481:web:42e8083b966cb633da0938",
};

// init firebase
initializeApp(firebaseConfig);

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// initializeAppCheck(app, {
//   provider: new ReCaptchaV3Provider(firebaseConfig.siteKey),

//   // Optional argument. If true, the SDK automatically refreshes App Check
//   // tokens as needed.
//   isTokenAutoRefreshEnabled: true,
// });

// init services
const db = getFirestore();
const auth = getAuth();

export { db, auth };
