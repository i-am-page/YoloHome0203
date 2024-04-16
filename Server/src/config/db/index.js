const { initializeApp } = require('firebase/compat/app');
const { getFirestore } = require('firebase/compat/firestore');
const firebase = require('firebase/compat/app');

const firebaseConfig = {
    apiKey: "AIzaSyDixhK_PVqi1VZcXm6byBsLlsxMq_b_RXk",
    authDomain: "dadn-yolohome0203.firebaseapp.com",
    projectId: "dadn-yolohome0203",
    storageBucket: "dadn-yolohome0203.appspot.com",
    messagingSenderId: "603018343740",
    appId: "1:603018343740:web:c32da8dfff6a54ccab9a39",
    measurementId: "G-LYV81H72VT"
};

const firebaseApp = initializeApp(firebaseConfig);
//const db = firebase.getFirestore(firebaseApp);

module.exports = firebaseApp;
