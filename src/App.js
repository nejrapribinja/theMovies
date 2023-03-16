import Home from "./Home";
import { Route, Routes, Navigate } from "react-router-dom";
import Show from "./tvShowComponents/Show";
import Movie from "./movieComponents/Movie";
import FilterMovie from "./movieComponents/FilterMovie";
import FilterShow from "./tvShowComponents/FilterShow";
import SearchResults from "./components/SearchResults";
import PrivateRoutes from "./utils/PrivateRoutes";
import MyFavorites from "./components/MyFavorites";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/show/:id" element={<Show />} />
      <Route path="/movie/:id" element={<Movie />} />
      <Route path="/filter-show/:string" element={<FilterShow />} />
      <Route path="/filter-movie/:string" element={<FilterMovie />} />
      <Route path="/search-results" element={<SearchResults />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/my-favorites" element={<MyFavorites />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
