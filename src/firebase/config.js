import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBRtPvxH7umG2MbtDhD9r3BA_MQWbxhMls",
  authDomain: "larder-to-table.firebaseapp.com",
  projectId: "larder-to-table",
  storageBucket: "larder-to-table.appspot.com",
  messagingSenderId: "94101149481",
  appId: "1:94101149481:web:42e8083b966cb633da0938",
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();

// timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, timestamp };
