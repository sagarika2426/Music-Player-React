import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SongList from "./components/SongList";
import Search from "./components/Search";
import MusicPlayer from "./components/MusicPlayer";
import Sidebar from "./components/SideBar";
import Tabs from "./components/Tabs";
import NoSongImage from "./assets/NoSongImage.png";
import { fetchSongsWithDuration } from "./utils/getSongDuration";

const App = () => {
  // State for managing current song, songs list, filtered songs, top tracks, search query, menu status, and background color
  const [currentSong, setCurrentSong] = useState(null);
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [filteredTopTracks, setFilteredTopTracks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [bgColor, setBgColor] = useState("#000000");

  // Load songs and top tracks on initial render
  useEffect(() => {
    const loadSongs = async () => {
      const data = await fetchSongsWithDuration();
      setSongs(data);
      setFilteredSongs(data);
      const filteredTopTracks = data.filter((song) => song.top_track === true);
      setTopTracks(filteredTopTracks);
      setFilteredTopTracks(filteredTopTracks);
    };
    loadSongs();
  }, []);

  // Filter songs and top tracks based on the search query
  useEffect(() => {
    const result = songs.filter(
      (song) =>
        song.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredSongs(result);

    const topTrackResult = topTracks.filter(
      (song) =>
        song.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTopTracks(topTrackResult);
  }, [searchQuery, songs, topTracks]);

  // Update background color based on the current song's accent color
  useEffect(() => {
    if (currentSong) {
      const gradientColor = currentSong.accent || "#000000";
      setBgColor(gradientColor);
    }
  }, [currentSong]);

  // Handle next song in the playlist
  const handleNextSong = () => {
    if (currentSong) {
      const currentIndex = songs.findIndex(
        (song) => song.id === currentSong.id
      );
      const nextIndex = (currentIndex + 1) % songs.length;
      setCurrentSong(songs[nextIndex]);
    }
  };

  // Handle previous song in the playlist
  const handlePreviousSong = () => {
    if (currentSong) {
      const currentIndex = songs.findIndex(
        (song) => song.id === currentSong.id
      );
      const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
      setCurrentSong(songs[prevIndex]);
    }
  };

  // Toggle the visibility of the menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Router>
      <div
        className={`flex lg:h-[calc(100dvh)]] h-screen lg:p-6 w-full flex-col lg:flex-row p-4`}
        style={{
          background: `linear-gradient(to top left, #000000, ${bgColor})`, // Set background gradient
        }}
      >
        <div className="lg:w-1/2 flex flex-col w-full">
          <div className="lg:flex w-full justify-between">
            <Sidebar onToggle={toggleMenu} /> {/* Sidebar component */}
            <div
              className={`transition-all duration-300 ease-linear absolute top-16 left-100 right-0 bg-black bg-opacity-90 overflow-hidden rounded-md ${
                isMenuOpen ? "max-h-screen" : "max-h-0"
              } lg:static lg:flex lg:flex-col lg:overflow-visible lg:bg-transparent lg:w-1/2 list-none space-y-1 z-20`}
            >
              <Tabs /> {/* Tabs component */}
              <Search onSearch={setSearchQuery} /> {/* Search component */}

              <Routes>
                <Route
                  path="/"
                  element={
                    <SongList
                      songs={filteredSongs}
                      onSelectSong={setCurrentSong}
                      currentSong={currentSong}
                    />
                  }
                />
                <Route
                  path="/top-tracks"
                  element={
                    <SongList
                      songs={filteredTopTracks}
                      onSelectSong={setCurrentSong}
                      currentSong={currentSong}
                    />
                  }
                />
              </Routes>
            </div>
          </div>
        </div>

        {/* Music player section */}
        <div className="flex justify-center lg:w-1/2 w-full mt-4">
          {currentSong ? (
            <MusicPlayer
              song={currentSong}
              onNext={handleNextSong}
              onPrevious={handlePreviousSong}
            />
          ) : (
            <div className="text-center text-white">
              <img src={NoSongImage} className="h-auto lg:h-96" />
              <p className="my-4">No music is playing...</p>
              <p className="text-lg font-semibold lg:text-xl">
                Select a track to play!
              </p>
            </div>
          )}
        </div>
      </div>
    </Router>
  );
};

export default App;
