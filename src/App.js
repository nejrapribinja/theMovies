import Movies from "./Movies";
import Navbar from "./Navbar";
import SearchComponent from "./SearchComponent";
import TvShows from "./TvShows";

function App() {
  return (
    <>
      <Navbar />
      <SearchComponent />
      <Movies />
      <TvShows />
    </>
  );
}

export default App;
