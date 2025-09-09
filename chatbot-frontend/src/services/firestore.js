import { db } from './firebase';
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  doc,
  setDoc
} from 'firebase/firestore';

// Add a new message to the user's chat
export const sendMessage = async (uid, text, sender = 'user') => {
  const chatRef = collection(db, 'chats', uid, 'messages');
  await addDoc(chatRef, {
    text,
    sender,
    createdAt: serverTimestamp(),
  });
};

// Listen to chat messages in real time
export const listenToMessages = (uid, callback) => {
  const chatRef = collection(db, 'chats', uid, 'messages');
  const q = query(chatRef, orderBy('createdAt', 'asc'));
  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(messages);
  });
};

// Create or update user profile
export const saveUserProfile = async (user) => {
  if (!user?.uid) return;
  const userRef = doc(db, 'users', user.uid);
  await setDoc(userRef, {
    email: user.email,
    name: user.name,
    avatar: user.avatar,
    updatedAt: serverTimestamp(),
  }, { merge: true });
};
