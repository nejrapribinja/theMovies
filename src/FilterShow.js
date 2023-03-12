import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TvShowCard from "./TvShowCard";
import Navbar from "./Navbar";
import axios from "axios";
const apiKey = process.env.REACT_APP_API_KEY;

const FilterMovie = () => {
  const { string } = useParams();
  const [shows, setShows] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/tv/${string}?api_key=${apiKey}&language=en-US&page=1`)
      .then((response) => {
        setShows(response.data.results);
        console.log(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [shows]);
  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="row d-flex">
          <div className="col-2">
            <h2 className="crd p-2">dddd</h2>
          </div>
          <div className="col-10">
            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-5 g-4">
              {shows.map((show) => {
                return (
                  <div className="col">
                    <TvShowCard key={show.id} {...show} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterMovie;
