import Home from "./Home";
import { Route, Routes, Navigate } from "react-router-dom";
import Show from "./Show";
import Movie from "./Movie";
import FilterMovie from "./FilterMovie";
import FilterShow from "./FilterShow";
import SearchResults from "./SearchResults";
import PrivateRoutes from "./utils/PrivateRoutes";
import MyFavorites from "./MyFavorites";

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
