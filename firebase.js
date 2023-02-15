import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: 'AIzaSyD-Rt8f9arTAyx3Cto5UiBAMCgWTSqWr5o',
    authDomain: 'traded-30136.firebaseapp.com',
    databaseURL: 'https://traded-30136.firebaseio.com',
    projectId: 'traded-30136',
    storageBucket: 'traded-30136.appspot.com',
    messagingSenderId: '377765289576',
    appId: '1:377765289576:web:702d72990eb34576e0a5dd',
    measurementId: 'G-EYEMV2R9CV',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);