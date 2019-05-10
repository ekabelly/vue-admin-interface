import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyB7mrxln6mIVrgxUroa132u39SDUjOu_DE",
    authDomain: "admin-interface-dev.firebaseapp.com",
    databaseURL: "https://admin-interface-dev.firebaseio.com",
    projectId: "admin-interface-dev",
    storageBucket: "admin-interface-dev.appspot.com",
    messagingSenderId: "545870692958",
    appId: "1:545870692958:web:4a6f975f84c7eec6"
  };

  export default firebase.initializeApp(firebaseConfig);