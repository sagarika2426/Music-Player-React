export const fetchSongs = async () => {
    const response = await fetch('https://cms.samespace.com/items/songs');
    const result = await response.json();
    return result.data || [];
  };