import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBO86L707tjnk_DQWmeEr_wiHIr2ZHlAqI',
  authDomain: 'react-project-2-microblo-ebcbf.firebaseapp.com',
  projectId: 'react-project-2-microblo-ebcbf',
  storageBucket: 'react-project-2-microblo-ebcbf.appspot.com',
  messagingSenderId: '832108737424',
  appId: '1:832108737424:web:b24e433093c89dccc23915',
};

const app = initializeApp(firebaseConfig);

//database
const db = getFirestore(app);

export { db };
