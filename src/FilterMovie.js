import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import { AiTwotoneCalendar } from "react-icons/ai";
const apiKey = process.env.REACT_APP_API_KEY;

const FilterMovie = () => {
  const { string } = useParams();
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${string}?api_key=${apiKey}&language=en-US&page=1`)
      .then((response) => {
        setMovies(response.data.results);
        console.log(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [movies]);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`)
      .then((response) => {
        setGenres(response.data.genres);
        console.log(response.data.genres);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(genres);
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="row  d-flex">
          <div className="col-2">
            <div className="crd p-3 mb-2" style={{ width: "200px" }}>
              <h5>Sort</h5>

              <label>Sort by</label>
              <select class="form-select form-select-sm" aria-label=".form-select-sm example">
                <option selected>Title (A-Z)</option>
                <option value="2">Year of release descending</option>
                <option value="3">Year of release ascending</option>
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
                    class="btn btn-light me-1 mb-1"
                    style={{ fontSize: "10px" }}>
                    {genre.name}
                  </button>
                );
              })}
              <label className="mt-3">Year of release</label>
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  aria-label="Dollar amount (with dot and two decimal places)"
                />
                <span class="input-group-text">
                  <AiTwotoneCalendar />
                </span>
              </div>
            </div>
            <button className="btn">Search</button>
          </div>
          <div className="col-10">
            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-5 g-4">
              {movies.map((movie) => {
                return (
                  <div className="col">
                    <MovieCard key={movie.id} {...movie} />
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

export default FilterMovie;
