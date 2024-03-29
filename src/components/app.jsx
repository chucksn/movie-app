import { Route, Routes } from "react-router-dom";
import SharedLayout from "../pages/sharedLayout";
import Movies from "../pages/movies";
import TvSeries from "../pages/tvSeries";
import Home from "../pages/home";
import SearchResult from "../pages/searchResult";
import NoPage from "../pages/noPage";
import SignIn from "../pages/sign-in";
import WatchList from "../pages/watchList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="movies" element={<Movies />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="watchlist" element={<WatchList />} />
        <Route path="tvSeries" element={<TvSeries />} />
        <Route path="search-result" element={<SearchResult />} />
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
  );
}

export default App;
