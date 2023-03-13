import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const apiKey = process.env.REACT_APP_API_KEY;

const SearchComponent = () => {
  const searchRef = useRef();
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = async () => {
    try {
      const response1 = await axios.get(
        `
        https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchRef.current.value}&page=1&include_adult=false`
      );
      const searchResults1 = response1.data.results;
      console.log(response1.data.results);
      const response2 = await axios.get(
        `
        https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&language=en-US&query=${searchRef.current.value}&page=1&include_adult=false`
      );
      const searchResults2 = response2.data.results;
      console.log(response2.data.results);
      navigate("/search-results", { state: { searchResults1, searchResults2 } });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container header">
      <h1 className="ps-5"> Welcome.</h1>
      <h3 className="ps-5">Millions of movies, TV shows and people to discover. Explore now.</h3>

      <div class="input-group mt-5 p-5">
        <input
          type="text"
          class="form-control"
          placeholder="Search for a movie, tv show, person......"
          ref={searchRef}
          onKeyDown={handleKeyDown}
        />
        <button class="btn" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchComponent;
