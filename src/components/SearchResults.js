import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import MovieCard from "../movieComponents/MovieCard";
import TvShowCard from "../tvShowComponents/TvShowCard";
import { Container, Row, Col, Card } from "react-bootstrap";

const SearchResults = () => {
  const location = useLocation();
  const movies = location.state?.movies;
  const tvShows = location.state?.tvShows;

  return (
    <>
      <Navbar />
      <Container>
        <Row className="pt-5">
          <Col md={2}>
            <Card className="p-3 ">
              <Card.Title>
                <h6>Search Results</h6>
              </Card.Title>
              <Card.Text>
                <p>Movies: {movies.length}</p>
                <p>TV shows: {tvShows.length}</p>
              </Card.Text>
            </Card>
          </Col>
          <Col md={10}>
            <Row xs={2} md={3} lg={5} className="g-4 ">
              {movies.map((movie) => {
                return (
                  <Col key={movie.id}>
                    <MovieCard {...movie} />
                  </Col>
                );
              })}
              {tvShows.map((show) => {
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

export default SearchResults;
