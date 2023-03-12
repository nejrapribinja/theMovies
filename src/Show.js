import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
const apiKey = process.env.REACT_APP_API_KEY;

const Show = () => {
  const [show, setShow] = useState([]);
  const { id } = useParams();
  const { poster_path, name, first_air_date, overview, created_by, backdrop_path, genres } = show;

  const styles = {
    backgroundImage: `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${backdrop_path})`,
    backgroundSize: "cover",
    height: "70vh",
  };

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=en-US`)
      .then((response) => {
        setShow(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <Navbar />
      <section style={styles}>
        <div className="back d-flex  align-items-center">
          <img
            src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${poster_path}`}
            className="m-5"
          />
          <div>
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
            <h4 className="mt-3">Overview</h4>
            <p>{overview}</p>

            {created_by?.length > 0 ? (
              <div>
                {created_by.map((c) => (
                  <>
                    <h6 key={c.id}>{c.name}</h6>
                    <p></p>
                  </>
                ))}
              </div>
            ) : (
              <p></p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
export default Show;
