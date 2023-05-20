import firebase from "firebase/app";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAn3JSuHrOmOE3dQP9g8g-_XKkXBMGah_4",
  authDomain: "advance-sonar-368318.firebaseapp.com",
  projectId: "advance-sonar-368318",
};

export default function initFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
}
