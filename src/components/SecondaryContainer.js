import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  return (
    movies.nowPlayingMovies && (
      <div className="bg-black pl-4 md:pl-12">
        <div className="mt-0 md:-mt-52   relative z-20">
          <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
        </div>

        <MovieList title={"Popular"} movies={movies.popularMovies} />
        <MovieList title={"Trending"} movies={movies.nowPlayingMovies} />
        <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
        <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
      </div>
    )
  );
};

export default SecondaryContainer;
