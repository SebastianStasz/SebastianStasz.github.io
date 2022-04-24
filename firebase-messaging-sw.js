importScripts('https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.1.3/firebase-auth-compat.js');




// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDWqnsslx9LG9eoW7J8mgCKCEPIqreXc3w",
    authDomain: "psm-project-dead3.firebaseapp.com",
    projectId: "psm-project-dead3",
    storageBucket: "psm-project-dead3.appspot.com",
    messagingSenderId: "548059118381",
    appId: "1:548059118381:web:c83a459be4f097de20b1a4"
};

console.log('firebase:');
console.log(firebase);

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
console.log('firebase initialized');

// Retrieve Firebase Messaging object.
const messaging = firebase.messaging();

messaging.onMessage((payload) => {
    console.log('Message received. ', payload);
});