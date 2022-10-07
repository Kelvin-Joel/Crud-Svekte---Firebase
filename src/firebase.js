import { initializeApp } from "firebase/app";
import  {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyD3ZKQ_wHxZWbpjHbAL8Z5-TrzmUVBzoIo",
  authDomain: "svelte-crud-55282.firebaseapp.com",
  projectId: "svelte-crud-55282",
  storageBucket: "svelte-crud-55282.appspot.com",
  messagingSenderId: "229250191037",
  appId: "1:229250191037:web:885069a007779dd814f1d4"
};

const app = initializeApp(firebaseConfig);
export const db= getFirestore(app)