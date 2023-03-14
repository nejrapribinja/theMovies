import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import TvShowCard from "./TvShowCard";
import axios from "axios";
const apiKey = process.env.REACT_APP_API_KEY;

const MyFavorites = () => {
  const sessionId = localStorage.getItem("sessionId");
  const accountID = localStorage.getItem("accountId");
  const [favoriteShows, setFavoriteShows] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const getFavoriteMovies = async () => {
    console.log(accountID, apiKey, sessionId);
    await axios
      .get(
        `https://api.themoviedb.org/3/account/${accountID}/favorite/movies?api_key=${apiKey}&language=en-US&session_id=${sessionId}&sort_by=created_at.asc&page=1`
      )
      .then((response) => {
        setFavoriteMovies(response.data.results);
        console.log(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getFavoriteShows = async () => {
    console.log(accountID, apiKey, sessionId);
    await axios
      .get(
        `https://api.themoviedb.org/3/account/${accountID}/favorite/tv?api_key=${apiKey}&language=en-US&session_id=${sessionId}&sort_by=created_at.asc&page=1`
      )
      .then((response) => {
        setFavoriteShows(response.data.results);
        console.log(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getFavoriteMovies();
    getFavoriteShows();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row pt-5">
          <div className="col-12">
            <h5>Movies</h5>
            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-5 g-4 ">
              {favoriteMovies.map((movie) => {
                return (
                  <div className="col">
                    <MovieCard key={movie.id} {...movie} />
                  </div>
                );
              })}
            </div>
            <h5>Tv Shows</h5>
            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-5 g-4 ">
              {favoriteShows.map((show) => {
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

export default MyFavorites;
