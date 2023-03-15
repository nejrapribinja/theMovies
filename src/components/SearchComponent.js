import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { searchMoviesAndShows } from "../api/api";
import { Container, Row, Col, InputGroup, FormControl, Button } from "react-bootstrap";

const SearchComponent = () => {
  const searchRef = useRef();
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = async () => {
    try {
      const { searchResults1, searchResults2 } = await searchMoviesAndShows(
        searchRef.current.value
      );
      navigate("/search-results", { state: { searchResults1, searchResults2 } });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className="header">
      <h1 className="ps-5"> Welcome.</h1>
      <h3 className="ps-5">Millions of movies, TV shows and people to discover. Explore now.</h3>
      <Row className="mt-5">
        <Col md={{ span: 10, offset: 1 }} className="p-5">
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search for a movie, tv show, person......"
              ref={searchRef}
              onKeyDown={handleKeyDown}
            />
            <Button variant="primary" onClick={handleSearch} className="bt">
              Search
            </Button>
          </InputGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchComponent;
