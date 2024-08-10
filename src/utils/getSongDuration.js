export const fetchSongsWithDuration = async () => {
    const response = await fetch('https://cms.samespace.com/items/songs');
    const result = await response.json();
    const songs = result.data || [];
  
    await Promise.all(songs.map(async (song) => {
      const audio = new Audio(song.url);
      await new Promise(resolve => {
        audio.addEventListener('loadedmetadata', () => {
          song.duration = audio.duration;
          resolve();
        });
      });
    }));
  
    return songs;
  };
  