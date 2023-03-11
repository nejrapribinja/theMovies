import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/tv/popular?api_key=c6d6659e774322031d29a692fe261b8e&language=en-US&page=1"
      )
      .then((response) => {
        setMovies(response.data.results);
        console.log(movies);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div class="container mt-4 mb-4">
      <h3>Movies</h3>
      <div class="d-flex  overflow-x-scroll">
        {movies.map((movie, index) => {
          return <MovieCard key={movie.id} {...movie} />;
        })}
      </div>
    </div>
  );
};
export default Movies;
