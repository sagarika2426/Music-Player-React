import { useState, useEffect } from 'react';
import SongListShimmer from '../components/SongListShimmer';

const SongList = ({ songs, onSelectSong, currentSong }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsVisible(true);
    }, 500);

    return () => {
      clearTimeout(timer);
      setIsVisible(false);
    };
  }, [songs]);

  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  if (isLoading) {
    return <SongListShimmer />;
  }

  if (songs.length === 0) {
    return <div className="text-white mt-4">No songs or artists found</div>;
  }

  return (
    <div
      className={`transition-opacity duration-500 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <ul className="list-none p-0 m-0 mt-2 space-y-2">
        {songs.map((song) => (
          <li
            key={song.id}
            className={`flex items-center p-2 cursor-pointer hover:bg-white hover:bg-opacity-10 rounded-lg w-80 ${
              currentSong?.id === song.id ? 'font-extrabold' : ''
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
            <span className="text-gray-400">{formatDuration(song.duration)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SongList;
