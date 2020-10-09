import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBcJPOi-oJM1iURU5RHAMWjfQdV5BB1wvc",
    authDomain: "project-hunt-96fdb.firebaseapp.com",
    databaseURL: "https://project-hunt-96fdb.firebaseio.com",
    projectId: "project-hunt-96fdb",
    storageBucket: "project-hunt-96fdb.appspot.com",
    messagingSenderId: "528503429442",
    appId: "1:528503429442:web:47987621b6c5b23d94d0db"
};
try {
    firebase.initializeApp(firebaseConfig);
} catch (err) {
    if (!/already exists/.test(err.message)) {
        console.error('Firebase initialization error', err.stack)
    }
}

const fb = firebase
export default fb;