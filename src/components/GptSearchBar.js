import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { addGPTMovieResults } from "../utils/gptSlice";
const GptSearchBar = () => {
  const searchText = useRef(null);
  const langKey = useSelector((store) => store.config.lang);
  const dispatch = useDispatch();
  const searchMovieTMDB = async (movieName) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movieName +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };
  const handleGPTSearchClick = async (e) => {
    e.preventDefault();
    const gptQuery =
      "Act as a movie recommendation system and suggest some movies for the query: " +
      searchText.current.value +
      ". Only give me names of 5 movies, comma separated like the example result given ahead. Expample Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gya";
    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });

    if (!gptResults.choices) {
    }

    const gptMovies = gptResults.choices?.[0]?.message?.content?.split(",");
    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    const tmdbResults = await Promise.all(promiseArray);
    dispatch(
      addGPTMovieResults({ movieNames: gptMovies, movieResults: tmdbResults })
    );
  };
  return (
    <div className="flex justify-center pt-[50%] md:pt-[10%]">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12"
        onSubmit={handleGPTSearchClick}
      >
        <input
          type="text"
          ref={searchText}
          placeholder={lang[langKey].placeholder}
          className="p-4 m-4 col-span-9"
        />
        <button className="py-2 px-4 m-4 bg-red-700 text-white rounded-lg col-span-3">
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
