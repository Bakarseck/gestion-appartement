// src/renderer.js
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc, query, where, getDocs } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDLIlElEpxWR62d4FNPtGPTMi3rxP1v28c",
    authDomain: "gestion-app-ff00f.firebaseapp.com",
    projectId: "gestion-app-ff00f",
    storageBucket: "gestion-app-ff00f.appspot.com",
    messagingSenderId: "896411384924",
    appId: "1:896411384924:web:e1424f858540495db1ba99",
    measurementId: "G-0SEL3636G8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Elements js
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = loginForm["email"].value;
  const password = loginForm["password"].value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("Logged in", user);
    })
    .catch((error) => {
      console.error(error);
    });
});

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = registerForm["email"].value;
  const password = registerForm["password"].value;
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Registered
      const user = userCredential.user;
      console.log("Registered", user);
    })
    .catch((error) => {
      console.error(error);
    });
});

const db = getFirestore(app);

// Ajouter un paiement
const addPayment = async (memberId, amount, date) => {
  try {
    const docRef = await addDoc(collection(db, "payments"), {
      memberId,
      amount,
      date
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// Consulter les membres qui ont payé
const getPaidMembers = async () => {
  const q = query(collection(db, "payments"), where("paid", "==", true));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
  });
};