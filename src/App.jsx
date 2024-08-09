import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SongList from "./components/SongList";
import Search from "./components/Search";
import { fetchSongs } from "./utils/api";
import MusicPlayer from "./components/MusicPlayer";
import Sidebar from "./components/SideBar";
import Tabs from "./components/Tabs";
import NoSongImage from "./assets/NoSongImage.png"

const App = () => {
  const [currentSong, setCurrentSong] = useState(null);
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [filteredTopTracks, setFilteredTopTracks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [bgColor, setBgColor] = useState("#000000");

  useEffect(() => {
    const loadSongs = async () => {
      const data = await fetchSongs();
      setSongs(data);
      setFilteredSongs(data);

      const filteredTopTracks = data.filter((song) => song.top_track === true);
      setTopTracks(filteredTopTracks);
      setFilteredTopTracks(filteredTopTracks);
    };
    loadSongs();
  }, []);

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

  useEffect(() => {
    if (currentSong) {
      const gradientColor = currentSong.accent || "#000000";
      setBgColor(gradientColor);
    }
  }, [currentSong]);

  const handleNextSong = () => {
    if (currentSong) {
      const currentIndex = songs.findIndex(
        (song) => song.id === currentSong.id
      );
      const nextIndex = (currentIndex + 1) % songs.length;
      setCurrentSong(songs[nextIndex]);
    }
  };

  const handlePreviousSong = () => {
    if (currentSong) {
      const currentIndex = songs.findIndex(
        (song) => song.id === currentSong.id
      );
      const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
      setCurrentSong(songs[prevIndex]);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Router>
      <div
        className={`flex h-screen p-2 lg:p-6 w-full flex-col lg:flex-row`}
        style={{
          background: `linear-gradient(to top left, #000000, ${bgColor})`,
        }}
      >
        <div className="lg:w-1/2 flex flex-col w-full">
          <div className="lg:flex w-full justify-between">
            <Sidebar onToggle={toggleMenu} />
            <div
              className={`transition-all duration-300 ease-linear absolute top-16 left-36 right-0 bg-black bg-opacity-90 overflow-hidden rounded-md ${
                isMenuOpen ? "max-h-screen" : "max-h-0"
              } lg:static lg:flex lg:flex-col lg:overflow-visible lg:bg-transparent lg:w-1/2 list-none space-y-1 z-20`} // Ensure song list shows on large screens
            >
              <Tabs />
              <Search onSearch={setSearchQuery} />

              <Routes>
                <Route
                  path="/"
                  element={
                    <SongList
                      songs={filteredSongs}
                      onSelectSong={setCurrentSong}
                    />
                  }
                />
                <Route
                  path="/top-tracks"
                  element={
                    <SongList
                      songs={filteredTopTracks}
                      onSelectSong={setCurrentSong}
                    />
                  }
                />
              </Routes>
            </div>
          </div>
        </div>

        {/* Music player section */}
        <div className="flex items-center justify-center lg:w-1/2 w-full mt-4">
          {currentSong ? (
            <MusicPlayer
              song={currentSong}
              onNext={handleNextSong}
              onPrevious={handlePreviousSong}
            />
          ) : (
            <div className="text-center text-white">
              

              <img src={NoSongImage} className="h-auto"/>
              <p className="my-4">No music is playing...</p>
              <p className="text-lg font-semibold lg:text-xl">Select a track to play!</p>
            </div>
          )}
        </div>
      </div>
    </Router>
  );
};

export default App;
