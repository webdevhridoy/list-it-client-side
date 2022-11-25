// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCpb-1eY8NZgVBVt4f3FP9gO0AdpLo0cxo",
    authDomain: "listit-classified.firebaseapp.com",
    projectId: "listit-classified",
    storageBucket: "listit-classified.appspot.com",
    messagingSenderId: "710950248324",
    appId: "1:710950248324:web:cd90d175874ece7caf07d1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;