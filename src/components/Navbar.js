import { FaPlus, FaBell, FaUser, FaHeart } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import { useState, useEffect } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { userLogout } from "../api/api";

const CustomNavbar = () => {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const sessionId = localStorage.getItem("sessionId");

  useEffect(() => {
    setIsLoggedIn(!!sessionId);
  }, [isLoggedIn]);

  const handleLogout = async () => {
    const success = await userLogout();
    if (success) {
      localStorage.removeItem("sessionId");
      localStorage.removeItem("accountId");
      setIsLoggedIn(false);
      navigate("/");
    } else {
      console.log("error");
    }
  };

  const handleClick = () => {
    if (isLoggedIn) {
      navigate("/my-favorites");
    } else {
      setModalShow(true);
    }
  };

  return (
    <Navbar bg="body" variant="tertiary" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="navbarTogglerDemo01" />
        <Navbar.Brand href="#">
          <img
            width="300"
            height="30"
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
            onClick={() => navigate("/")}
          />
        </Navbar.Brand>
        <Navbar.Collapse id="navbarTogglerDemo01">
          <Nav className="me-auto mb-2 mb-lg-0">
            <NavDropdown title="Movies" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => navigate("/filter-movie/popular")}>
                Popular
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/filter-movie/now_playing")}>
                Now playing
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/filter-movie/upcoming")}>
                Upcoming
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/filter-movie/top_rated")}>
                Top rated
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="TV shows" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => navigate("/filter-show/popular")}>
                Popular
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/filter-show/airing_today")}>
                Airing today
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/filter-show/on_the_air")}>
                On TV
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/filter-show/top_rated")}>
                Top rated
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Item>
              <Nav.Link className="nav-link">People</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="nav-link">More</Nav.Link>
            </Nav.Item>
          </Nav>
          <Nav className="d-flex align-items-center">
            <Nav.Item>
              <Nav.Link href="#">
                <FaHeart onClick={handleClick} />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#">
                <FaPlus />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                style={{ border: "0.5px solid white", borderRadius: "6px", padding: "3px" }}>
                EN
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#">
                <FaBell />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              {isLoggedIn ? (
                <Nav.Link href="#" onClick={handleLogout}>
                  <MdOutlineLogout />
                </Nav.Link>
              ) : (
                <Nav.Link href="#" onClick={() => setModalShow(true)}>
                  <FaUser />
                </Nav.Link>
              )}
            </Nav.Item>
          </Nav>
          <Login
            show={modalShow}
            onHide={() => setModalShow(false)}
            setIsLoggedIn={setIsLoggedIn}
            isLoggedIn={isLoggedIn}
          />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
