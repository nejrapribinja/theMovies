import { useNavigate } from "react-router-dom";

const MovieCard = ({ id, title, release_date, poster_path }) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className="crd ms-4 me-4">
      <img
        src={
          poster_path
            ? `https://www.themoviedb.org/t/p/w220_and_h330_face${poster_path}`
            : "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
        }
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
