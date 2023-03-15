import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import MovieCard from "../movieComponents/MovieCard";
import TvShowCard from "../tvShowComponents/TvShowCard";
import { getFavoriteMovies, getFavoriteTvShows } from "../api/api";
import { Container, Row, Col } from "react-bootstrap";

const MyFavorites = () => {
  const [favoriteShows, setFavoriteShows] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const favoriteMovies = await getFavoriteMovies();
      const favoriteShows = await getFavoriteTvShows();
      setFavoriteMovies(favoriteMovies);
      setFavoriteShows(favoriteShows);
    };
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <Container className="pt-5">
        <Row>
          <Col>
            <h5>Movies</h5>
            <Row xs={2} md={3} lg={5} className="g-4">
              {favoriteMovies.map((movie) => {
                return (
                  <Col key={movie.id}>
                    <MovieCard {...movie} />
                  </Col>
                );
              })}
            </Row>
            <h5 className="mt-5">Tv Shows</h5>
            <Row xs={2} md={3} lg={5} className="g-4">
              {favoriteShows.map((show) => {
                return (
                  <Col key={show.id}>
                    <TvShowCard {...show} />
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MyFavorites;
