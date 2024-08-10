import { useState, useEffect } from "react";
import SongListShimmer from "../components/SongListShimmer";

const SongList = ({ songs, onSelectSong, currentSong }) => {
  // State to control the visibility of the song list after loading
  const [isVisible, setIsVisible] = useState(false);
  // State to control the loading state
  const [isLoading, setIsLoading] = useState(true);

  // Effect hook to manage the loading state and visibility
  useEffect(() => {
    setIsLoading(true); // Set loading to true when songs change
    const timer = setTimeout(() => {
      setIsLoading(false); // Set loading to false after 500ms
      setIsVisible(true);
    }, 500);

    // Cleanup function to clear the timer and reset visibility
    return () => {
      clearTimeout(timer);
      setIsVisible(false);
    };
  }, [songs]); // Effect runs whenever `songs` changes

  // Function to format the song duration in "minutes:seconds"
  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Render shimmer UI while loading
  if (isLoading) {
    return <SongListShimmer />;
  }

  return (
    <div
      className={`transition-opacity duration-500 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Render a message if there are no songs */}
      {songs.length === 0 ? (
        <div className="text-white mt-4">No songs or artists found</div>
      ) : (
        <ul className="list-none p-0 m-0 mt-2 space-y-2">
          {/* Render each song in the list */}
          {songs.map((song) => (
            <li
              key={song.id}
              className={`flex items-center p-2 cursor-pointer hover:bg-white hover:bg-opacity-10 rounded-lg w-80 ${
                currentSong?.id === song.id ? "font-extrabold" : ""
              }`}
              onClick={() => onSelectSong(song)}
            >
              <img
                src={`https://cms.samespace.com/assets/${song.cover}`}
                alt={song.name}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div className="flex-grow">
                <h3 className="text-white text-md">{song.name}</h3>
                <p className="text-gray-400 text-xs">{song.artist}</p>
              </div>
              <span className="text-gray-400">
                {formatDuration(song.duration)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SongList;
