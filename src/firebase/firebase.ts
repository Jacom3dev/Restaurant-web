import app from 'firebase/compat/app' ;
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

import { firebaseConfig } from './config';

class Firebase {
    db:app.firestore.Firestore;
    storage:app.storage.Storage;
    constructor(){
        app.initializeApp(firebaseConfig);
        this.db = app.firestore();
        this.storage = app.storage();
    }
}

const firebase = new Firebase();

export default firebase;