import Home from "./Home";
import { Route, Routes, Navigate } from "react-router-dom";
import Show from "./Show";
import Movie from "./Movie";
import FilterMovie from "./FilterMovie";
import FilterShow from "./FilterShow";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/show/:id" element={<Show />} />
      <Route path="/movie/:id" element={<Movie />} />
      <Route path="/filterShow/:string" element={<FilterShow />} />
      <Route path="/filterMovie/:string" element={<FilterMovie />} />
    </Routes>
  );
}

export default App;
