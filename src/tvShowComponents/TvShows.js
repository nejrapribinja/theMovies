import { useEffect, useState } from "react";
import TvShowCard from "./TvShowCard";
import { getPopularTvShows } from "../api/api";

const TvShows = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchPopularTvShows = async () => {
      const popularTvShows = await getPopularTvShows();
      if (popularTvShows) {
        setShows(popularTvShows);
        //console.log(popularTvShows);
      }
    };
    fetchPopularTvShows();
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
