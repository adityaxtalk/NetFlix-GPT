import React from "react";
import { IMAGE_CDN } from "../utils/constants";

const MovieCard = ({ poster_path }) => {
  if (!poster_path) return;
  return (
    <div className="w-36 md:w-48 pr-4">
      <img alt="Movie card" src={IMAGE_CDN + poster_path} />
    </div>
  );
};

export default MovieCard;
