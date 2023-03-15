import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { searchMoviesAndShows } from "../api/api";

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
      const { searchResults1, searchResults2 } = await searchMoviesAndShows(
        searchRef.current.value
      );
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
