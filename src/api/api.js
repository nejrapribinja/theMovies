import axios from "axios";
const apiKey = process.env.REACT_APP_API_KEY;

export const getMoviesGenres = async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
    );
    return response.data.genres;
  } catch (error) {
    console.log(error);
  }
};

export const getTvShowsGenres = async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}&language=en-US`
    );
    return response.data.genres;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMovies = async (string) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${string}?api_key=${apiKey}&language=en-US&page=1`
    );
    return response.data.results;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const fetchTvShows = async (string) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/${string}?api_key=${apiKey}&language=en-US&page=1`
    );
    return response.data.results;
  } catch (error) {
    console.log(error);
    return [];
  }
};
