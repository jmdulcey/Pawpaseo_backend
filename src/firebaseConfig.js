import { initializeApp } from 'firebase/app';
import { getAnalytics, } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyCVizPeSUAELRBdTLw844VdnByB6Dnq8fU",
    authDomain: "pawpaseo-notificaciones.firebaseapp.com",
    projectId: "pawpaseo-notificaciones",
    storageBucket: "pawpaseo-notificaciones.appspot.com",
    messagingSenderId: "725358731063",
    appId: "1:725358731063:web:95946809c5102864c0c4b2",
    measurementId: "G-KH1EEG22TJ"
  };

const firebaseApp = initializeApp(firebaseConfig);

const analytics = () => {
  if (typeof window !== 'undefined') {
    return getAnalytics(firebaseApp);
  } else {
    return null;
  }
};

export default firebaseApp;
export { analytics };
