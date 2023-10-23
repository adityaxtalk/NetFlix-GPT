import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestion from "./GptMovieSuggestion";
import { BG_URL } from "../utils/constants";

const GptSearch = () => {
  return (
    <>
      <div className="absolute -z-10 opacity-90">
        <img
          className="w-screen h-screen object-cover"
          src={BG_URL}
          alt="background"
        />
      </div>
      <div>
        <GptSearchBar />
        <GptMovieSuggestion />
      </div>
    </>
  );
};

export default GptSearch;
