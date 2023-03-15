import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { getTvShow, markFavoriteTvShow, getFavoriteTvShows } from "../api/api";
import { Container, Row, Col, Button } from "react-bootstrap";
import Login from "../components/Login";

const Show = () => {
  const [show, setShow] = useState([]);
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteShows, setFavoriteShows] = useState([]);
  const { poster_path, name, first_air_date, overview, created_by, backdrop_path, genres } = show;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const sessionId = localStorage.getItem("sessionId");
  const [modalShow, setModalShow] = useState(false);

  const styles = {
    backgroundImage: `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${backdrop_path})`,
    backgroundSize: "cover",
    height: "70vh",
  };
  useEffect(() => {
    setIsLoggedIn(!!sessionId);
  }, [isLoggedIn]);

  const handleFavorite = async () => {
    if (isLoggedIn) {
      try {
        const response = await markFavoriteTvShow({
          showId: show.id,
          isFavorite,
        });
        setIsFavorite(!isFavorite);
      } catch (error) {
        console.error(error);
      }
    } else {
      setModalShow(true);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tvShowData = await getTvShow(id);
        setShow(tvShowData);

        if (isLoggedIn) {
          const favoriteTvShowsData = await getFavoriteTvShows();
          setFavoriteShows(favoriteTvShowsData);
        }
      } catch (error) {
        console.log(error);
        alert("Unable to fetch data.");
      }
    };
    fetchData();
  }, [isLoggedIn]);

  useEffect(() => {
    if (favoriteShows && favoriteShows.find((show) => show.id === parseInt(id))) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [favoriteShows, id]);

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
                {name} ({first_air_date})
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
              <h4 className="mt-3">Overview</h4>
              <p>{overview}</p>

              {created_by?.length > 0 ? (
                <div>
                  {created_by.map((c) => (
                    <div key={c.id}>
                      <h6>{c.name}</h6>
                    </div>
                  ))}
                </div>
              ) : (
                <p></p>
              )}
            </Col>
            <Login
              show={modalShow}
              onHide={() => setModalShow(false)}
              setIsLoggedIn={setIsLoggedIn}
              isLoggedIn={isLoggedIn}
            />
          </Row>
        </Container>
      </section>
    </>
  );
};
export default Show;
