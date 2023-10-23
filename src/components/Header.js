import { signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });

    // Unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);
  const user = useSelector((store) => store.user);

  const handleGPTSearchClick = () => {
    dispatch(toggleGptSearchView());
  };
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  // can use ref too
  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };
  return (
    <div className="absolute px-8 py-2 flex justify-between w-screen bg-gradient-to-b from-black z-10 flex-col  md:flex-row ">
      <img className="w-44 mx-auto md:mx-0" src={LOGO} alt="Logo" />
      {user && (
        <div className="flex justify-between p-2">
          {showGptSearch && (
            <select
              className="p-2 bg-gray-900 text-white m-2"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg"
            onClick={handleGPTSearchClick}
          >
            {!showGptSearch ? "GPT Search" : "Home Page"}
          </button>
          <img
            className="hidden md:block w-12 h-12"
            alt="usericon"
            src={user.photoURL}
          />
          <button onClick={handleSignOut} className="font-bold text-white">
            (Sign Out)
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
