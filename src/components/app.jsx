import { Route, Routes } from "react-router-dom";
import SharedLayout from "../pages/sharedLayout";
import Movies from "../pages/movies";
import TvSeries from "../pages/tvSeries";
import Home from "../pages/home";
import Search from "../pages/search";
import NoPage from "../pages/noPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="movies" element={<Movies />} />
        <Route path="tvSeries" element={<TvSeries />} />
        <Route path="search" element={<Search />} />
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
  );
}

export default App;
