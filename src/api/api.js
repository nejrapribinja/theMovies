import axios from "axios";
const apiKey = process.env.REACT_APP_API_KEY;
const sessionId = localStorage.getItem("sessionId");
const accountId = localStorage.getItem("accountId");

export const userLogin = async (username, password) => {
  try {
    const responseToken = await axios.get(
      `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`
    );
    const requestToken = responseToken.data.request_token;

    const responseValidation = await axios.post(
      `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`,
      {
        username: username,
        password: password,
        request_token: requestToken,
      }
    );
    //console.log(responseValidation);
    if (responseValidation.data.success === true) {
      const responseSession = await axios.post(
        `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}`,
        {
          request_token: requestToken,
        }
      );
      const sessionId = responseSession.data.session_id;

      localStorage.setItem("sessionId", sessionId);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getAccount = async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/account?api_key=${apiKey}&session_id=${sessionId}`
    );
    localStorage.setItem("accountId", response.data.id);
  } catch (error) {
    console.log(error);
  }
};

export const getPopularMovies = async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
    );
    return response.data.results;
  } catch (error) {
    console.error(error);
    return null;
  }
};

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

export const getMovie = async (id) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Unable to get movie details.");
  }
};

export const getTvShow = async (id) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=en-US`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Unable to get tv show details.");
  }
};

export const getFavoriteMovies = async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/account/${accountId}/favorite/movies?api_key=${apiKey}&language=en-US&session_id=${sessionId}&sort_by=created_at.asc&page=1`
    );
    return response.data.results;
  } catch (error) {
    console.log(error);
    throw new Error("Unable to get favorite movies.");
  }
};

export const getFavoriteTvShows = async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/account/${accountId}/favorite/tv?api_key=${apiKey}&language=en-US&session_id=${sessionId}&sort_by=created_at.asc&page=1`
    );
    return response.data.results;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const markFavoriteMovie = async ({ movieId, isFavorite }) => {
  try {
    const response = await axios.post(
      `https://api.themoviedb.org/3/account/${accountId}/favorite?api_key=${apiKey}&session_id=${sessionId}`,
      {
        media_type: "movie",
        media_id: movieId,
        favorite: !isFavorite,
      }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const markFavoriteTvShow = async ({ showId, isFavorite }) => {
  try {
    const response = await axios.post(
      `https://api.themoviedb.org/3/account/${accountId}/favorite?api_key=${apiKey}&session_id=${sessionId}`,
      {
        media_type: "tv",
        media_id: showId,
        favorite: !isFavorite,
      }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const searchMoviesAndShows = async (searchTerm) => {
  try {
    const response1 = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchTerm}&page=1&include_adult=false`
    );
    const searchResults1 = response1.data.results;
    //console.log(response1.data.results);
    const response2 = await axios.get(
      `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&language=en-US&query=${searchTerm}&page=1&include_adult=false`
    );
    const searchResults2 = response2.data.results;
    //console.log(response2.data.results);
    return { searchResults1, searchResults2 };
  } catch (error) {
    console.error(error);
  }
};
