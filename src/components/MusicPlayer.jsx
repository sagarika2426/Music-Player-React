import { useState, useEffect, useRef } from "react";
import { IconButton } from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CustomSlider from "./CustomSlider";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import PauseCircleRoundedIcon from "@mui/icons-material/PauseCircleRounded";
import FastForwardRoundedIcon from "@mui/icons-material/FastForwardRounded";
import FastRewindRoundedIcon from "@mui/icons-material/FastRewindRounded";

const MusicPlayer = ({ song, onNext, onPrevious }) => {
  // State to manage play/pause status, current time, and duration
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null); // Reference to the audio element

  // Effect to handle song changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause(); // Pause the previous song
    }

    if (song) {
      const newAudio = new Audio(song.url);
      audioRef.current = newAudio;

      // Update duration when metadata is loaded
      const handleLoadedMetadata = () => {
        setDuration(newAudio.duration);
        if (isPlaying) {
          newAudio.play(); // Auto-play if already playing
        }
      };

      // Update current time as the song plays
      const handleTimeUpdate = () => {
        setCurrentTime(newAudio.currentTime);
      };

      // Handle end of song and move to the next song
      const handleEnded = () => {
        setIsPlaying(false);
        onNext();
      };

      newAudio.addEventListener("loadedmetadata", handleLoadedMetadata);
      newAudio.addEventListener("timeupdate", handleTimeUpdate);
      newAudio.addEventListener("ended", handleEnded);

      return () => {
        newAudio.pause();
        newAudio.removeEventListener("loadedmetadata", handleLoadedMetadata);
        newAudio.removeEventListener("timeupdate", handleTimeUpdate);
        newAudio.removeEventListener("ended", handleEnded);
      };
    }
  }, [song]);

  // Effect to play or pause the song based on isPlaying state
  useEffect(() => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [isPlaying]);

  // Toggle play/pause status
  const playPauseHandler = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Update current time when slider value changes
  const handleTimeChange = (event, newValue) => {
    if (audioRef.current) {
      audioRef.current.currentTime = newValue;
      setCurrentTime(newValue);
    }
  };

  // Effect to reset player when a new song is selected
  useEffect(() => {
    if (song) {
      setCurrentTime(0);
      setIsPlaying(true);
    }
  }, [song]);

  if (!song) return null; // Render nothing if no song is selected

  return (
    <div className="rounded-lg shadow-lg text-white w-full lg:w-auto z-10">
      {/* Song details */}
      <div className="text-start gap-1 flex flex-col mb-8">
        <h2 className="text-xl font-bold md:text-2xl">{song.name}</h2>
        <p className="text-gray-400 text-sm">{song.artist}</p>
      </div>
      {/* Song cover image */}
      <div className="flex flex-col items-center mb-3">
        <img
          src={`https://cms.samespace.com/assets/${song.cover}`}
          alt={song.name}
          className="w-full h-96 object-cover rounded-lg shadow-md lg:w-96 lg:h-96"
        />
      </div>
      {/* Playback progress slider */}
      <div>
        <CustomSlider
          value={currentTime}
          max={duration}
          onChange={handleTimeChange}
          aria-label="Song Progress"
        />
      </div>
      {/* Control buttons */}
      <div className="flex flex-row justify-between items-center m-0">
        <IconButton>
          <MoreHorizIcon
            className="text-white bg-white rounded-full bg-opacity-10 p-2"
            fontSize="large"
          />
        </IconButton>
        <div className="flex">
          <IconButton onClick={onPrevious}>
            <FastRewindRoundedIcon className="text-white" />
          </IconButton>
          <IconButton onClick={playPauseHandler}>
            {isPlaying ? (
              <PauseCircleRoundedIcon className="text-white" fontSize="large" />
            ) : (
              <PlayCircleRoundedIcon className="text-white" fontSize="large" />
            )}
          </IconButton>
          <IconButton onClick={onNext}>
            <FastForwardRoundedIcon className="text-white" />
          </IconButton>
        </div>
        <IconButton>
          <VolumeUpIcon
            className="text-white bg-white rounded-full bg-opacity-10 p-2"
            fontSize="large"
          />
        </IconButton>
      </div>
    </div>
  );
};

export default MusicPlayer;
