import { FaPlus, FaBell } from "react-icons/fa";
import { GoSearch } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
          <a class="navbar-brand" href="#">
            <img
              width="300"
              height="30"
              src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
            />
          </a>
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 ">
            <li class="nav-item me-3 dropdown">
              <a class="nav-link" aria-current="page" href="#">
                Movies
              </a>
              <div class="dropdown-content">
                <a href="#" onClick={() => navigate("/filter-movie/popular")}>
                  Popular
                </a>
                <a href="#" onClick={() => navigate("/filter-movie/now_playing")}>
                  Now playing
                </a>
                <a href="#" onClick={() => navigate("/filter-movie/upcoming")}>
                  Upcoming
                </a>
                <a href="#" onClick={() => navigate("/filter-movie/top_rated")}>
                  Top rated
                </a>
              </div>
            </li>
            <li class="nav-item me-3 dropdown">
              <a class="nav-link" href="#">
                TV shows
              </a>
              <div class="dropdown-content">
                <a href="#" onClick={() => navigate("/filter-show/popular")}>
                  Popular
                </a>
                <a href="#" onClick={() => navigate("/filter-show/airing_today")}>
                  Airing today
                </a>
                <a href="#" onClick={() => navigate("/filter-show/on_the_air")}>
                  On TV
                </a>
                <a href="#" onClick={() => navigate("/filter-show/top_rated")}>
                  Top rated
                </a>
              </div>
            </li>
            <li class="nav-item me-3">
              <a class="nav-link ">People</a>
            </li>
            <li class="nav-item me-3">
              <a class="nav-link ">More</a>
            </li>
          </ul>
          <div class="d-flex">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 align-items-center">
              <li class="nav-item me-3">
                <a class="nav-link" href="#">
                  <FaPlus />
                </a>
              </li>
              <li class="nav-item me-3">
                <a
                  class="nav-link"
                  style={{ border: "0.5px solid white", borderRadius: "6px", padding: "3px" }}
                  href="#">
                  EN
                </a>
              </li>
              <li class="nav-item me-3">
                <a class="nav-link" href="#">
                  <FaBell />
                </a>
              </li>
              <li class="nav-item me-3">
                <a class="nav-link" href="#">
                  <GoSearch />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
