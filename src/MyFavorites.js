import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import TvShowCard from "./TvShowCard";
import { getFavoriteMovies, getFavoriteShows } from "./api/api";

const MyFavorites = () => {
  const [favoriteShows, setFavoriteShows] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const favoriteMovies = await getFavoriteMovies();
      const favoriteShows = await getFavoriteShows();
      setFavoriteMovies(favoriteMovies);
      setFavoriteShows(favoriteShows);
    };

    fetchData();
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
