import Movies from "./movieComponents/Movies";
import Navbar from "./components/Navbar";
import SearchComponent from "./components/SearchComponent";
import TvShows from "./tvShowComponents/TvShows";

const Home = () => {
  return (
    <>
      <Navbar />
      <SearchComponent />
      <Movies />
      <TvShows />
    </>
  );
};

export default Home;
