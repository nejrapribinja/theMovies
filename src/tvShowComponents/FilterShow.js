import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TvShowCard from "./TvShowCard";
import Navbar from "../components/Navbar";
import { AiTwotoneCalendar } from "react-icons/ai";
import { getTvShowsGenres, fetchTvShows } from "../api/api";
import { Container, Row, Col, Button, Form, InputGroup, Card } from "react-bootstrap";

const FilterShow = () => {
  const { string } = useParams();
  const [shows, setShows] = useState([]);
  const [originalShows, setOriginalShows] = useState([]);
  const [genres, setGenres] = useState([]);
  const [sortBy, setSortBy] = useState("title");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [year, setYear] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchTvShows(string);
      setShows(response);
      setOriginalShows(response);
      console.log(response);
    };
    fetchData();
  }, [string]);

  useEffect(() => {
    const fetchData = async () => {
      const genres = await getTvShowsGenres();
      setGenres(genres);
      console.log(genres);
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
    let sortedShows = [...originalShows];
    if (sortBy === "title") {
      sortedShows.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "release_desc") {
      sortedShows.sort((a, b) => b.first_air_date.localeCompare(a.first_air_date));
    } else if (sortBy === "release_asc") {
      sortedShows.sort((a, b) => a.first_air_date.localeCompare(b.first_air_date));
    }

    const filteredGenres = genres
      .filter((genre) => selectedGenres.includes(genre.id))
      .map((genre) => genre.id);

    let filteredShows = sortedShows.filter((show) => {
      if (filteredGenres.length === 0) {
        return true;
      }
      return show.genre_ids.some((genreId) => filteredGenres.includes(genreId));
    });

    if (year) {
      filteredShows = filteredShows.filter((show) => {
        return show.first_air_date && show.first_air_date.startsWith(year);
      });
    }
    setShows(filteredShows);
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
            <Row xs={2} md={3} lg={5} className="g-4">
              {shows.map((show) => {
                return (
                  <Col>
                    <TvShowCard key={show.id} {...show} />
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

export default FilterShow;
