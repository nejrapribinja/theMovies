import { useNavigate } from "react-router-dom";

const TvShowCard = ({ ...show }) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/show/${id}`);
  };

  return (
    <div className="crd me-4 ms-4">
      <img
        src={
          show.poster_path
            ? `https://www.themoviedb.org/t/p/w220_and_h330_face${show.poster_path}`
            : "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
        }
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
