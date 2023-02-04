import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCeMJm_CxPAkto4A0YvmVeobi29_x5mxNY',
  authDomain: 'book-memo-b9665.firebaseapp.com',
  projectId: 'book-memo-b9665',
  storageBucket: 'book-memo-b9665.appspot.com',
  messagingSenderId: '342292239686',
  appId: '1:342292239686:web:ee122ffcd4f5ac03454147',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export default db;
