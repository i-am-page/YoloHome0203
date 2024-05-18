require('dotenv').config();
const { initializeApp } = require('firebase/compat/app');
const { getFirestore } = require('firebase/compat/firestore');
const firebase = require('firebase/compat/app');

const firebaseConfig = {
    apiKey: process.env.FIREBASE_APIKEY, // "AIzaSyDixhK_PVqi1VZcXm6byBsLlsxMq_b_RXk",
    authDomain: process.env.FIREBASE_AUTHDOMAIN,// "dadn-yolohome0203.firebaseapp.com",
    projectId:process.env.FIREBASE_PROJECTID,// "dadn-yolohome0203",
    storageBucket: process.env.FIREBASE_STORAGEBUCKET,//"dadn-yolohome0203.appspot.com",
    messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,// "603018343740",
    appId: process.env.FIREBASE_APPID,//"1:603018343740:web:c32da8dfff6a54ccab9a39",
    measurementId: process.env.FIREBASE_MEASUREMENTID,// "G-LYV81H72VT"
};


const firebaseApp = initializeApp(firebaseConfig);
//const db = firebase.getFirestore(firebaseApp);

module.exports = firebaseApp;
