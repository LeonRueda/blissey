import firebase from "firebase";
import {Observable} from 'rxjs'

const FIREBASE_API_KEY = process.env.REACT_APP_FIREBASE_API_KEY
const FIREBASE_AUTH_DOMAIN = process.env.REACT_APP_FIREBASE_AUTH_DOMAIN
const FIREBASE_DATABASE_URL = process.env.REACT_APP_FIREBASE_DATABASE_URL
const FIREBASE_PROJECT_ID = process.env.REACT_APP_FIREBASE_PROJECT_ID
const FIREBASE_STORAGE_BUCKET = process.env.REACT_APP_FIREBASE_STORAGE_BUCKET
const FIREBASE_MESSAGING_SENDER_ID = process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID


export class FirebaseService {
  constructor () {
    // Initialize Firebase
    var config = {
      apiKey: FIREBASE_API_KEY,
      authDomain: FIREBASE_AUTH_DOMAIN,
      databaseURL: FIREBASE_DATABASE_URL,
      projectId: FIREBASE_PROJECT_ID,
      storageBucket: FIREBASE_STORAGE_BUCKET,
      messagingSenderId: FIREBASE_MESSAGING_SENDER_ID
    };

    this.firebaseInstance = firebase.initializeApp(config);
  }

  initPlannerChannel (plannerRef, callback) {
    this.firestore = this.firebaseInstance.firestore()

    const observable = Observable.create(observer => this.firestore
      .collection("planner")
      .doc(plannerRef)
      .onSnapshot(observer)
    );
    observable.subscribe({
      next(value) { callback(value) }
    });
  }
}

// singletton instance from service
const firebaseService = new FirebaseService()

export default firebaseService;
