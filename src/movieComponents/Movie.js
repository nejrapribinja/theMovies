import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { getMovie, getFavoriteMovies, markFavoriteMovie } from "../api/api";
import { Container, Row, Col, Button } from "react-bootstrap";

const Movie = () => {
  const [movie, setMovie] = useState([]);
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
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
      const response = await markFavoriteMovie({
        movieId: movie.id,
        isFavorite,
      });
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieData = await getMovie(id);
        setMovie(movieData);

        const favoriteMoviesData = await getFavoriteMovies();
        setFavoriteMovies(favoriteMoviesData);
      } catch (error) {
        console.log(error);
        alert("Unable to fetch data.");
      }
    };
    fetchData();
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
        <Container fluid>
          <Row className="back d-flex align-items-center">
            <Col md={3}>
              <img
                src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${poster_path}`}
                className="m-5"
              />
            </Col>
            <Col md={9}>
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
              <Button
                onClick={handleFavorite}
                className="d-flex justify-content-center align-items-center m-2">
                {isFavorite ? <FaHeart /> : <FaRegHeart />}
              </Button>
              <p>{tagline}</p>
              <h4 className="mt-3">Overview</h4>
              <p>{overview}</p>
              {created_by?.length > 0 ? (
                <div>
                  {created_by.map((c) => (
                    <div key={c.id}>
                      <h6>{c.name}</h6>
                      <p></p>
                    </div>
                  ))}
                </div>
              ) : (
                <p></p>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};
export default Movie;