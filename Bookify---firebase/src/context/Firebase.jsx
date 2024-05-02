import React, { useEffect, useState } from "react";
import { createContext, useContext } from "react";

//firebase
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:  import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "bookify-13b4a.firebaseapp.com",
  projectId: "bookify-13b4a",
  storageBucket: "bookify-13b4a.appspot.com",
  messagingSenderId: "193486365498",
  appId: "1:193486365498:web:c45e2950be334e95fc6603",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const fireabseAuth = getAuth();
const googleAuth = new GoogleAuthProvider();
const firebaseStorage = getStorage();
const fireStore = getFirestore(firebaseApp);

const firebaseContext = createContext(null);
export const useFireBase = () => useContext(firebaseContext);

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signupWithEmailandPassword = async (email, password) => {
    const result = await createUserWithEmailAndPassword(
      fireabseAuth,
      email,
      password
    );
    console.log("signup", result);
  };

  const signupWithGoogle = async () => {
    const result = await signInWithPopup(fireabseAuth, googleAuth);
    // console.log("signup", result);
  };

  const signinUser = async (email, password) => {
    const result = await signInWithEmailAndPassword(
      fireabseAuth,
      email,
      password
    );
    // console.log("signin", result);
  };

  const signOutUser = async () => {
    await signOut(fireabseAuth);
  };

  const uploadDataInStore = async (
    bookName,
    isbn,
    price,
    bookDescription,
    authorName,
    coverPicture,
    pdfFile
  ) => {
    const ImageRef = ref(
      firebaseStorage,
      `Cover-Images/${Date.now()}-${coverPicture.name}`
    );
    const imageURL = await uploadBytes(ImageRef, coverPicture);

    const pdfUrl = await uploadBytes(ref(firebaseStorage, `PdfFiles/${Date.now()}-${pdfFile.name}`), pdfFile)
    // console.log('image uploaded' , imageURL.ref.fullPath)
    const docRef = await addDoc(collection(fireStore, "books"), {
      bookName,
      isbn,
      price,
      bookDescription,
      authorName,
      coverPicture: imageURL.ref.fullPath,
      pdfFile: pdfUrl.ref.fullPath,
      uploadedBy: user.displayName || '',
      userEmail: user.email,
      userPhotoURL: user.photoURL,
    });
  };

  const getAllBooks = async () => {
    return await getDocs(collection(fireStore, "books"));
    // console.log('books are' , result)
    // return result.forEach((item)=> {
    //     // console.log(item.data())
    //     return item.data()
    // })
  };

  const getImageUrl = async(path)=>{
    const imageRef = ref(firebaseStorage, path)
    const url = await getDownloadURL(imageRef)
    return url
  }

  const getPdfUrl = async(path)=>{
    const imageRef = ref(firebaseStorage, path)
    const url = await getDownloadURL(imageRef)
    return url
  }

  useEffect(() => {
    onAuthStateChanged(fireabseAuth, (user) => {
      if (user) {
        setUser(user);
        // console.log(user)
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <firebaseContext.Provider
      value={{
        signupWithEmailandPassword,
        signupWithGoogle,
        signinUser,
        user,
        signOutUser,
        uploadDataInStore,
        getAllBooks,
        getImageUrl,
        getPdfUrl,
      }}
    >
      {children}
    </firebaseContext.Provider>
  );
};
