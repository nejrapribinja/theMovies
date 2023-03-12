import { useEffect, useState } from "react";
import TvShowCard from "./TvShowCard";
import axios from "axios";
const apiKey = process.env.REACT_APP_API_KEY;

const TvShows = () => {
  const [shows, setShows] = useState([]);
  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=1`)
      .then((response) => {
        setShows(response.data.results);
        console.log(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div class="container mt-4 mb-4">
      <h3>Shows</h3>
      <h6>What's Popular</h6>
      <div class="d-flex overflow-x-scroll">
        {shows.map((show) => {
          return <TvShowCard key={show.id} {...show} />;
        })}
      </div>
    </div>
  );
};
export default TvShows;
