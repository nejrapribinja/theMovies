import { useNavigate } from "react-router-dom";

const MovieCard = ({ id, title, release_date, poster_path }) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className="crd ms-4 me-4">
      <img
        src={`https://www.themoviedb.org/t/p/w220_and_h330_face${poster_path}`}
        width="150"
        height="225"
        alt="..."
        onClick={() => handleClick(id)}
        style={{ cursor: "pointer", borderTopRightRadius: "10px", borderTopLeftRadius: "10px" }}
      />
      <div className="pt-2 ps-2">
        <h6 onClick={() => handleClick(id)} style={{ cursor: "pointer" }}>
          {title}
        </h6>
        <p>{release_date}</p>
      </div>
    </div>
  );
};
export default MovieCard;
