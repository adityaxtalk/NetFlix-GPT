import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL, USER_AVATAR } from "../utils/constants";

function Login() {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const toggleSignInForm = () => {
    setIsSignInForm((prev) => !prev);
  };

  const handleButtonClick = (e) => {
    // Validate the form data
    e.preventDefault();
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      // Sign Up Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(addUser({ uid, email, displayName, photoURL }));
            })
            .catch((error) => {
              // An error occurred
              // ...
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " " + errorMessage);
        });
    } else {
      // SignIn Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " " + errorMessage);
        });
    }
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          className="h-screen w-screen object-cover"
          src={BG_URL}
          alt="background"
        />
      </div>
      <form
        onSubmit={handleButtonClick}
        className="w-full md:w-3/12 p-12 text-white bg-black bg-opacity-80 rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <h1 className="font-bold text-3xl py-4 ">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        <p className="font-bold text-red">{errorMessage}</p>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-700"
          />
        )}
        <input
          type="text"
          ref={email}
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-700"
        />

        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700"
        />
        <button className="p-4 my-6 bg-red-700 w-full rounded-lg">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already Registered ? Sign In Now"}
        </p>
      </form>
    </div>
  );
}

export default Login;
