export const fetchSongs = async () => {
  const response = await fetch('https://cms.samespace.com/items/songs');
  const result = await response.json();
  const songs = result.data || [];
  
  // Fetch the duration for each song
  const songsWithDuration = await Promise.all(songs.map(async (song) => {
    const duration = await getSongDuration(song.url);
    return { ...song, duration };
  }));
  
  return songsWithDuration;
};
