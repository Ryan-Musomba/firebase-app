import { 
    doc, 
    setDoc, 
    getDoc, 
    collection, 
    addDoc, 
    updateDoc, 
    getDocs,
    query,
    where
  } from 'firebase/firestore';
  import { db } from './config';
  
  export const createUserProfile = async (userId, data) => {
    await setDoc(doc(db, 'users', userId), data);
  };
  
  export const getUserProfile = async (userId) => {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  };
  
  export const updateUserProfile = async (userId, data) => {
    await updateDoc(doc(db, 'users', userId), data);
  };
  
  export const addOrder = async (orderData) => {
    const docRef = await addDoc(collection(db, 'orders'), orderData);
    return docRef.id;
  };
  
  export const getOrdersByUser = async (userId) => {
    const q = query(collection(db, 'orders'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  };