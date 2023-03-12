import Home from "./Home";
import { Route, Routes, Navigate } from "react-router-dom";
import Show from "./Show";
import Movie from "./Movie";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/show/:id" element={<Show />} />
      <Route path="/movie/:id" element={<Movie />} />
    </Routes>
  );
}

export default App;
