import firebase from 'firebase'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyA1IYAvok3g1x1eplsqj5I1RqeqVLfEOhU",
    authDomain: "arcane-climber-193216.firebaseapp.com",
    databaseURL: "https://arcane-climber-193216.firebaseio.com",
    projectId: "arcane-climber-193216",
    storageBucket: "",
    messagingSenderId: "107469167325"
  };
if(!firebase.apps.length) {  
  firebase.initializeApp(config);
}

export const googleAuth = new firebase.auth.GoogleAuthProvider()
export const auth = firebase.auth()
export default firebase