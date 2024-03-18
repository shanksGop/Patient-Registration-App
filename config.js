import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyBexKonqQpLo6eSbCWy0mWxxstSYTB62CA",
  authDomain: "patientregistration-880db.firebaseapp.com",
  projectId: "patientregistration-880db",
  storageBucket: "patientregistration-880db.appspot.com",
  messagingSenderId: "835409936719",
  appId: "1:835409936719:web:1b7b6b1188f6ca6952053a"
};


 if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}
// Initialize Firebase
export default firebase.firestore()