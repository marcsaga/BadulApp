import Firebase from 'firebase';
let config = {
    apiKey: "AIzaSyDwzS-8-rQO18uUu4DQAMEZIfi7aAWVnpc",
    authDomain: "mapsupers.firebaseapp.com",
    databaseURL: "https://mapsupers.firebaseio.com",
    projectId: "mapsupers",
    storageBucket: "",
    messagingSenderId: "279676076080",
    appId: "1:279676076080:web:297052fc8c02bf8b"
};
let app = Firebase.initializeApp(config);
export const db = app.database();