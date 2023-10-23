import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";
const GptMovieSuggestion = () => {
  const { movieResults, movieNames } = useSelector((store) => store.gpt);
  if (!movieNames) return;

  return (
    <div className="p-4 m-4 bg-black bg-opacity-70 text-white">
      <div>
        {movieNames.map((movieName, index) => (
          <MovieList
            key={movieName}
            title={movieName}
            movies={movieResults[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default GptMovieSuggestion;
