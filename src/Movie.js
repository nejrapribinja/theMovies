import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
const apiKey = process.env.REACT_APP_API_KEY;
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Movie = () => {
  const [movie, setMovie] = useState([]);
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const sessionId = localStorage.getItem("sessionId");
  const accountID = localStorage.getItem("accountId");
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const {
    poster_path,
    original_title,
    release_date,
    overview,
    created_by,
    backdrop_path,
    genres,
    tagline,
  } = movie;

  const styles = {
    backgroundImage: `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${backdrop_path})`,
    backgroundSize: "cover",
    height: "70vh",
  };
  const handleFavorite = async () => {
    try {
      const response = await axios.post(
        `https://api.themoviedb.org/3/account/${accountID}/favorite?api_key=${apiKey}&session_id=${sessionId}`,
        {
          media_type: "movie",
          media_id: movie.id,
          favorite: !isFavorite,
        }
      );
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error(error);
    }
  };
  const getMovie = () => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`)
      .then((response) => {
        setMovie(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
  useEffect(() => {
    getMovie();
    getFavoriteMovies();
  }, []);
  useEffect(() => {
    if (favoriteMovies && favoriteMovies.find((show) => show.id === parseInt(id))) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [favoriteMovies, id]);
  return (
    <>
      <Navbar />
      <section style={styles}>
        <div className="back d-flex  align-items-center">
          <img
            src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${poster_path}`}
            className="m-5"
          />
          <div>
            <h2>
              {original_title} ({release_date})
            </h2>
            {genres?.length > 0 ? (
              <div>
                {genres.map((g) => (
                  <span key={g.id}>{g.name} </span>
                ))}
              </div>
            ) : (
              <p></p>
            )}
            <button onClick={handleFavorite} style={{ border: "none" }}>
              {isFavorite ? <FaHeart /> : <FaRegHeart />}
            </button>
            <p>{tagline}</p>
            <h4 className="mt-3">Overview</h4>
            <p>{overview}</p>

            {created_by?.length > 0 ? (
              <div>
                {created_by.map((c) => (
                  <>
                    <h6 key={c.id}>{c.name}</h6>
                    <p></p>
                  </>
                ))}
              </div>
            ) : (
              <p></p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
export default Movie;
