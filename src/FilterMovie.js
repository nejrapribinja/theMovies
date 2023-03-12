import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const apiKey = process.env.REACT_APP_API_KEY;

const FilterMovie = () => {
  const { string } = useParams();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${string}?api_key=${apiKey}&language=en-US&page=1`)
      .then((response) => {
        setMovies(response.data.results);
        console.log(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="container">
      <div className="row">
        <div className="col-3">
          <h2>ddd</h2>
        </div>
        <div className="9">
          <h3>ee</h3>
        </div>
      </div>
    </div>
  );
};

export default FilterMovie;
