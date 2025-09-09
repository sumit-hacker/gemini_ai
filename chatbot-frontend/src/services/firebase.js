
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: "AIzaSyBrcnGVGn6OLOf1jeoGZiVUjNdS9VFKyd4",
	authDomain: "chatbot-95f98.firebaseapp.com",
	projectId: "chatbot-95f98",
	storageBucket: "chatbot-95f98.firebasestorage.app",
	messagingSenderId: "191579991223",
	appId: "1:191579991223:web:4187e273fa8effa19ef132",
	measurementId: "G-JWSZJCXFY1"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };
