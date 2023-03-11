import MovieCard from "./MovieCard";

const Movies = () => {
  return (
    <div class="container mt-4 mb-4">
      <h3>Movies</h3>
      <div class="d-flex  overflow-x-scroll">
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
      </div>
    </div>
  );
};
export default Movies;
