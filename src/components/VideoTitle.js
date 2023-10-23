import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="pt-36 absolute px-6 md:px-12 text-white bg-gradient-to-r from-black w-screen aspect-video">
      <h1 className="text-2xl md:text-6xl font-bold">{title}</h1>
      <p className="hidden md:inline-block py-6 text-lg w-1/3">{overview}</p>
      <div>
        <button className="bg-white text-black py-1 md:py-4 px-3 md:px-12  my-2 md:my-0 w-32 font-bold rounded-md text-xl hover:bg-opacity-80">
          Play
        </button>
        <button className="hidden md:inline-block bg-gray-500 text-white p-4 mx-2 w-32 bg-opacity-50 rounded-md text-xl">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
