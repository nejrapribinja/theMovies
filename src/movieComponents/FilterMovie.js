import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import MovieCard from "./MovieCard";
import { AiTwotoneCalendar } from "react-icons/ai";
import { getMoviesGenres, fetchMovies } from "../api/api";
import { Container, Row, Col, Button, Form, Card, InputGroup } from "react-bootstrap";

const FilterMovie = () => {
  const { string } = useParams();
  const [movies, setMovies] = useState([]);
  const [originalMovies, setOriginalMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [sortBy, setSortBy] = useState("title");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [year, setYear] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchMovies(string);
      setMovies(response);
      setOriginalMovies(response);
      //console.log(response);
    };
    fetchData();
  }, [string]);

  useEffect(() => {
    const fetchData = async () => {
      const genres = await getMoviesGenres();
      setGenres(genres);
      //console.log(genres);
    };
    fetchData();
  }, []);

  const handleGenreClick = (genreId) => {
    if (selectedGenres.includes(genreId)) {
      setSelectedGenres(selectedGenres.filter((id) => id !== genreId));
    } else {
      setSelectedGenres([...selectedGenres, genreId]);
    }
  };

  const handleSearch = () => {
    let sortedMovies = [...originalMovies];
    if (sortBy === "title") {
      sortedMovies.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "release_desc") {
      sortedMovies.sort((a, b) => b.release_date.localeCompare(a.release_date));
    } else if (sortBy === "release_asc") {
      sortedMovies.sort((a, b) => a.release_date.localeCompare(b.release_date));
    }

    let filteredMovies = sortedMovies.filter((movie) => {
      if (selectedGenres.length === 0) {
        return true;
      }
      return movie.genre_ids.some((genreId) => selectedGenres.includes(genreId));
    });

    if (year) {
      filteredMovies = filteredMovies.filter((movie) => {
        return movie.release_date && movie.release_date.startsWith(year);
      });
    }
    setMovies(filteredMovies);
  };

  return (
    <>
      <Navbar />
      <Container className="mt-5">
        <Row className="d-flex">
          <Col md={2}>
            <Card className="p-3 mb-2" style={{ width: "200px" }}>
              <Card.Title>Sort</Card.Title>
              <Form.Select
                aria-label="Sort by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}>
                <option value="title">Title (A-Z)</option>
                <option value="release_desc">Year of release descending</option>
                <option value="release_asc">Year of release ascending</option>
              </Form.Select>
            </Card>
            <Card className="p-3 mb-2" style={{ width: "200px" }}>
              <Card.Title>Filter</Card.Title>
              <Card.Text>Genres</Card.Text>
              <div className="mb-3">
                {genres.map((genre) => {
                  return (
                    <button
                      type="button"
                      className={`me-1 mb-1 ${selectedGenres.includes(genre.id) ? "selected" : ""}`}
                      style={{ fontSize: "10px" }}
                      onClick={() => handleGenreClick(genre.id)}>
                      {genre.name}
                    </button>
                  );
                })}
              </div>
              <Form.Group>
                <Form.Label>Year of release</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  />
                  <InputGroup.Text>
                    <AiTwotoneCalendar />
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
            </Card>
            <Button variant="primary" onClick={handleSearch}>
              Search
            </Button>
          </Col>
          <Col md={10}>
            <Row className="row-cols-2 row-cols-md-3 row-cols-lg-5 g-4">
              {movies.map((movie) => {
                return (
                  <Col key={movie.id} className="col">
                    <MovieCard {...movie} />
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

export default FilterMovie;
