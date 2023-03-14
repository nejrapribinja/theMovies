import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TvShowCard from "./TvShowCard";
import Navbar from "./Navbar";
import { AiTwotoneCalendar } from "react-icons/ai";
import { getTvShowsGenres, fetchTvShows } from "./api/api";

const FilterShow = () => {
  const { string } = useParams();
  const [shows, setShows] = useState([]);
  const [originalShows, setOriginalShows] = useState([]);
  const [genres, setGenres] = useState([]);
  const [sortBy, setSortBy] = useState("title");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [year, setYear] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchTvShows(string);
      setShows(response);
      setOriginalShows(response);
      console.log(response);
    };
    fetchData();
  }, [string]);

  useEffect(() => {
    const fetchData = async () => {
      const genres = await getTvShowsGenres();
      setGenres(genres);
      console.log(genres);
    };
    fetchData();
  }, []);

  const handleGenreClick = (genreId) => {
    // Provjeri da li je genreId vec u nizu selectedGenres
    if (selectedGenres.includes(genreId)) {
      // Ako jeste, ukloni ga iz niza
      setSelectedGenres(selectedGenres.filter((id) => id !== genreId));
    } else {
      // Ako nije, dodaj ga u niz
      setSelectedGenres([...selectedGenres, genreId]);
    }
  };
  const handleSearch = () => {
    let sortedShows = [...originalShows];
    if (sortBy === "title") {
      sortedShows.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "release_desc") {
      sortedShows.sort((a, b) => b.first_air_date.localeCompare(a.first_air_date));
    } else if (sortBy === "release_asc") {
      sortedShows.sort((a, b) => a.first_air_date.localeCompare(b.first_air_date));
    }

    const filteredGenres = genres
      .filter((genre) => selectedGenres.includes(genre.id))
      .map((genre) => genre.id);
    let filteredShows = sortedShows.filter((show) => {
      if (filteredGenres.length === 0) {
        return true;
      }
      return show.genre_ids.some((genreId) => filteredGenres.includes(genreId));
    });
    if (year) {
      filteredShows = filteredShows.filter((show) => {
        return show.release_date && show.release_date.startsWith(year);
      });
    }
    setShows(filteredShows);
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="row  d-flex">
          <div className="col-2">
            <div className="crd p-3 mb-2" style={{ width: "200px" }}>
              <h5>Sort</h5>
              <label>Sort by</label>
              <select
                className="form-select form-select-sm"
                aria-label=".form-select-sm example"
                onChange={(e) => setSortBy(e.target.value)}>
                <option value="title">Title (A-Z)</option>
                <option value="release_desc">Year of release descending</option>
                <option value="release_asc">Year of release ascending</option>
              </select>
            </div>
            <div className="crd p-3 mb-2" style={{ width: "200px" }}>
              <h5>Filter</h5>

              <label>Genres</label>
              <br></br>
              {genres.map((genre) => {
                return (
                  <button
                    type="button"
                    className={`me-1 mb-1 ${selectedGenres.includes(genre.id) ? "selected" : ""}`}
                    style={{ fontSize: "10px" }}
                    onClick={() => handleGenreClick(genre.id)}>
                    {genre.name}
                  </button>
                );
              })}
              <label className="mt-3">Year of release</label>
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
                <span class="input-group-text">
                  <AiTwotoneCalendar />
                </span>
              </div>
            </div>
            <button className="btn" onClick={handleSearch}>
              Search
            </button>
          </div>
          <div className="col-10">
            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-5 g-4">
              {shows.map((show) => {
                return (
                  <div className="col">
                    <TvShowCard key={show.id} {...show} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterShow;
