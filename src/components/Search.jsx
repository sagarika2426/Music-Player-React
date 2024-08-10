import { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { CiSearch } from "react-icons/ci";

const Search = ({ onSearch }) => {
  // State to manage the search query
  const [query, setQuery] = useState("");

  // Handle input change, update state and call onSearch prop
  const handleChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  return (
    <TextField
      id="search-input"
      variant="outlined"
      placeholder="Search Song, Artist"
      value={query}
      onChange={handleChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <CiSearch color="white" />
          </InputAdornment>
        ),
        style: { color: "white" },
      }}
      sx={{
        bgcolor: "rgba(255, 255, 255, 0.1)",
        borderRadius: "5px",
      }}
      size="small"
      fullWidth
    />
  );
};

export default Search;
