import { 
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  TwitterAuthProvider,
  createUserWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { auth } from './config';
import { db } from './config'; // Import Firestore from the same config file
import { setDoc, doc } from "firebase/firestore"; // Firestore functions

export const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signUp = async ({ email, password, name, phone, address, userType }) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Save user data to Firestore
  await setDoc(doc(db, "employees", user.uid), {
    email: email,
    name: name,
    phone: phone,
    address: address,
    userType: userType,
    position: userType === 'staff' ? 'Employee' : 'Customer', // Default position
    createdAt: new Date().toISOString()
  });

  return { user: { ...user, profile: { name, phone, address, userType } } };
};

export const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

export const signInWithTwitter = () => {
  const provider = new TwitterAuthProvider();
  return signInWithPopup(auth, provider);
};

export const resetPassword = (email) => {
  return sendPasswordResetEmail(auth, email);
};

export const signOutUser = () => {
  return signOut(auth);
};