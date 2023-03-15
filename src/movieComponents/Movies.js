import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { getPopularMovies } from "../api/api";

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      const popularMovies = await getPopularMovies();
      if (popularMovies) {
        setMovies(popularMovies);
        //console.log(popularMovies);
      }
    };
    fetchPopularMovies();
  }, []);

  return (
    <div class="container mt-4 mb-4">
      <h3>Movies</h3>
      <h6>What's Popular</h6>
      <div class="d-flex overflow-x-scroll">
        {movies.map((movie) => {
          return <MovieCard key={movie.id} {...movie} />;
        })}
      </div>
    </div>
  );
};
export default Movies;
