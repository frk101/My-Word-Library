import {initializeApp, getApps, getApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDv5CmsfDjbwhlH_BzfaGv-NZe_tnVxWww',
  authDomain: 'my-english-47004.firebaseapp.com',
  projectId: 'my-english-47004',
  storageBucket: 'my-english-47004.appspot.com',
  messagingSenderId: '326478135441',
  appId: '1:326478135441:ios:58753201c4ae12cd2cff30',
};

// Firebase başlatma (Eğer zaten başlatılmışsa tekrar başlatma)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);
const auth = getAuth(app);

export {db, auth};
