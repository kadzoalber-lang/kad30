// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword }
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import {
  onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyBMaAlAEgeO9X5ULpBfg1PwyFWS7l0wNsU",
  authDomain: "smart-habit-tracker-83352.firebaseapp.com",
  projectId: "smart-habit-tracker-83352",
  storageBucket: "smart-habit-tracker-83352.firebasestorage.app",
  messagingSenderId: "922126177610",
  appId: "1:922126177610:web:14d75a098ddccc57751db3",
  measurementId: "G-RJYS44ETNX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


async function signup(username, email, password) {

  try {

        console.log("Creating user...");

   const username =
  document.getElementById("username").value;


const userCredential =
  await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

console.log("User created:", userCredential.user.uid);

await setDoc(
  doc(db, "users", userCredential.user.uid),
  {
    username,
    email,
    createdAt: new Date()
  }
);


console.log("Firestore write successful");

// Redirect AFTER the user document has been saved
    window.location.href = "dashboard.html";

  } catch (error) {

    console.error(error);

  }

}

//signup logic
const signupForm =
  document.getElementById("signupForm");

 if (signupForm) { 
signupForm.addEventListener("submit", async (e) => {

  e.preventDefault();

  const username =
      document.getElementById("username").value;

  const email =
    document.getElementById("email").value;

  const password =
    document.getElementById("password").value;

  const confirmPassword =
    document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  console.log("Signup form submitted");
  await signup(username, email, password);
  console.log("Signup function finished");
});
 }

//login
import {
  signInWithEmailAndPassword
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const loginForm =
  document.getElementById("loginForm");

  if (loginForm) {

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email =
      document.getElementById("email").value;

    const password =
      document.getElementById("password").value;

    try {

      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

      console.log(
        "Login successful:",
        userCredential.user.email
      );

      // Redirect after login
      window.location.href =
        "dashboard.html";

    } catch (error) {

      console.error(error);

      alert(
        "Invalid email or password"
      );

    }

  }
);
  }

//keep user logged in
onAuthStateChanged(auth, (user) => {
try {
  if (user) {

    console.log(
      "Already logged in:",
      user.email
    ); 
  }
 } catch (error) {

    console.error(error);

  }

});
