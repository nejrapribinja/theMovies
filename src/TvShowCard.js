const TvShowCard = ({ name, first_air_date, poster_path }) => {
  return (
    <div className=" me-4 ">
      <img
        src={`https://www.themoviedb.org/t/p/w220_and_h330_face${poster_path}`}
        width="150"
        height="225"
        alt="..."
      />
      <div>
        <h6>{name}</h6>
        <p>{first_air_date}</p>
      </div>
    </div>
  );
};
export default TvShowCard;
