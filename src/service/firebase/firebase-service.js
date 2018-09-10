import firebase from "firebase";
import {Observable} from 'rxjs'




export class FirebaseService {
  constructor () {
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyBSYkst1ohIKVQfiteicWtFTg6hzItoOjg",
      authDomain: "nurse-chansey.firebaseapp.com",
      databaseURL: "https://nurse-chansey.firebaseio.com",
      projectId: "nurse-chansey",
      storageBucket: "nurse-chansey.appspot.com",
      messagingSenderId: "127132960763"
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
