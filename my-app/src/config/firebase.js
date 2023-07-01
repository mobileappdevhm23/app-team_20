import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAaEytH6Wc_pPoKxmEgJ8SbsUJdx2biNHE",
    authDomain: "quiz-app-42b4a.firebaseapp.com",
    projectId: "quiz-app-42b4a",
    storageBucket: "quiz-app-42b4a.appspot.com",
    messagingSenderId: "358568203838",
    appId: "1:358568203838:web:1eee32c4b27c6d1fd9a36f",
};

const app = initializeApp(firebaseConfig);

export default app;