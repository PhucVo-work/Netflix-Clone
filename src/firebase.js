import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCZUV_DymlQhBeJ1Hnpo0su7f6u_Bx42eo",
  authDomain: "netflix-clone-c1e9a.firebaseapp.com",
  projectId: "netflix-clone-c1e9a",
  storageBucket: "netflix-clone-c1e9a.appspot.com",
  messagingSenderId: "554121712271",
  appId: "1:554121712271:web:2cfa51b0306275420956fa",
  measurementId: "G-9RLSNLKXN1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email, 
        })
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error.code);
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const logout =  () => {
    signOut(auth)
}

export { auth, db, login, signup, logout };