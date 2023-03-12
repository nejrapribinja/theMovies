import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  }, []);
  return <></>;
};

export default FilterMovie;
