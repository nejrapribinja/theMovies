import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import MovieCard from "../movieComponents/MovieCard";
import TvShowCard from "../tvShowComponents/TvShowCard";

const SearchResults = () => {
  const location = useLocation();
  const searchResults1 = location.state?.searchResults1;
  const searchResults2 = location.state?.searchResults2;

  useEffect(() => {
    console.log(searchResults1);
    console.log(searchResults2);
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row pt-5">
          <div className="col-2">
            <div className="crd p-3 ">
              <h6>Search Results</h6>
              <p>Movies: {searchResults1.length}</p>
              <p>TV shows: {searchResults2.length}</p>
            </div>
          </div>

          <div className="col-10">
            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-5 g-4 ">
              {searchResults1.map((movie) => {
                return (
                  <div className="col">
                    <MovieCard key={movie.id} {...movie} />
                  </div>
                );
              })}
              {searchResults2.map((show) => {
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

export default SearchResults;
