import { useNavigate } from "react-router-dom";

const TvShowCard = ({ ...show }) => {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/show/${id}`);
  };

  return (
    <div className="crd me-4 ms-4">
      <img
        src={`https://www.themoviedb.org/t/p/w220_and_h330_face${show.poster_path}`}
        width="150"
        height="225"
        alt="..."
        onClick={() => handleClick(show.id)}
        style={{ cursor: "pointer", borderTopRightRadius: "10px", borderTopLeftRadius: "10px" }}
      />
      <div className="pt-2 ps-2">
        <h6 style={{ cursor: "pointer" }} onClick={() => handleClick(show.id)} className="mt-2">
          {show.name}
        </h6>
        <p>{show.first_air_date}</p>
      </div>
    </div>
  );
};
export default TvShowCard;
