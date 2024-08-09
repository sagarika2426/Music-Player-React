import { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CustomSlider from './CustomSlider';
import PlayCircleRoundedIcon from '@mui/icons-material/PlayCircleRounded';
import PauseCircleRoundedIcon from '@mui/icons-material/PauseCircleRounded';
import FastForwardRoundedIcon from '@mui/icons-material/FastForwardRounded';
import FastRewindRoundedIcon from '@mui/icons-material/FastRewindRounded';

const MusicPlayer = ({ song, onNext, onPrevious }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  useEffect(() => {
    if (audio) {
      audio.pause();
    }

    if (song) {
      const newAudio = new Audio(song.url);
      setAudio(newAudio);
      newAudio.addEventListener('loadedmetadata', () => {
        setDuration(newAudio.duration);
        if (isPlaying) {
          newAudio.play();
        }
      });
      newAudio.addEventListener('timeupdate', () => {
        setCurrentTime(newAudio.currentTime);
      });
      newAudio.addEventListener('ended', () => {
        setIsPlaying(false);
        onNext();
      });

      if (isPlaying) {
        newAudio.play();
      }

      return () => {
        newAudio.pause();
      };
    }
  }, [song, isPlaying]);

  const playPauseHandler = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeChange = (event, newValue) => {
    if (audio) {
      audio.currentTime = newValue;
      setCurrentTime(newValue);
    }
  };

  useEffect(() => {
    if (song) {
      setIsPlaying(true);
    }
  }, [song]);

  if (!song) return null;

  return (
    <div className="rounded-lg shadow-lg text-white w-full lg:w-auto z-10">
      <div className="text-start gap-1 flex flex-col mb-8">
        <h2 className="text-xl font-bold md:text-2xl">{song.name}</h2>
        <p className="text-gray-400 text-sm">{song.artist}</p>
      </div>
      <div className="flex flex-col items-center mb-3">
        <img
          src={`https://cms.samespace.com/assets/${song.cover}`}
          alt={song.name}
          className="w-full h-96 object-cover rounded-lg shadow-md lg:w-96 lg:h-96"
        />
      </div>
      <div>
        <CustomSlider
          value={currentTime}
          max={duration}
          onChange={handleTimeChange}
          aria-label="Song Progress"
        />
      </div>
      <div className="flex flex-row justify-between items-center m-0">
        <IconButton>
          <MoreHorizIcon className="text-white bg-white rounded-full bg-opacity-10 p-2" fontSize='large' />
        </IconButton>
        <div className="flex">
          <IconButton onClick={onPrevious}>
            <FastRewindRoundedIcon className="text-white" />
          </IconButton>
          <IconButton onClick={playPauseHandler}>
            {isPlaying ? (
              <PauseCircleRoundedIcon className="text-white" fontSize='large'/>
            ) : (
              <PlayCircleRoundedIcon className="text-white" fontSize='large'/>
            )}
          </IconButton>
          <IconButton onClick={onNext}>
            <FastForwardRoundedIcon className="text-white" />
          </IconButton>
        </div>
        <IconButton>
          <VolumeUpIcon className="text-white bg-white rounded-full bg-opacity-10 p-2" fontSize='large'/>
        </IconButton>
      </div>
    </div>
  );
};

export default MusicPlayer;
