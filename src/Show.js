import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { getTvShow, markFavoriteTvShow, getFavoriteTvShows } from "./api/api";

const Show = () => {
  const [show, setShow] = useState([]);
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteShows, setFavoriteShows] = useState([]);
  const { poster_path, name, first_air_date, overview, created_by, backdrop_path, genres } = show;

  const styles = {
    backgroundImage: `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${backdrop_path})`,
    backgroundSize: "cover",
    height: "70vh",
  };

  const handleFavorite = async () => {
    try {
      const response = await markFavoriteTvShow({
        showId: show.id,
        isFavorite,
      });
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tvShowData = await getTvShow(id);
        setShow(tvShowData);

        const favoriteTvShowsData = await getFavoriteTvShows();
        setFavoriteShows(favoriteTvShowsData);
      } catch (error) {
        console.log(error);
        alert("Unable to fetch data.");
      }
    };
    fetchData();
  }, []);

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
            <button onClick={handleFavorite} style={{ border: "none" }}>
              {isFavorite ? <FaHeart /> : <FaRegHeart />}
            </button>
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
