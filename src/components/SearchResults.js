import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import MovieCard from "../movieComponents/MovieCard";
import TvShowCard from "../tvShowComponents/TvShowCard";
import { Container, Row, Col, Card } from "react-bootstrap";

const SearchResults = () => {
  const location = useLocation();
  const searchResults1 = location.state?.searchResults1;
  const searchResults2 = location.state?.searchResults2;

  useEffect(() => {
    console.log(searchResults1);
    console.log(searchResults2);
  }, []);

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
                <p>Movies: {searchResults1.length}</p>
                <p>TV shows: {searchResults2.length}</p>
              </Card.Text>
            </Card>
          </Col>

          <Col md={10}>
            <Row xs={2} md={3} lg={5} className="g-4 ">
              {searchResults1.map((movie) => {
                return (
                  <Col key={movie.id}>
                    <MovieCard {...movie} />
                  </Col>
                );
              })}
              {searchResults2.map((show) => {
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
