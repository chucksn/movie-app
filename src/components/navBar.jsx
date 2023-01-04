import { Link } from "react-router-dom";
import SearchForm from "./searchForm";

function NavBar() {
  return (
    <div className="nav-bar">
      <div className="logo-title">
        <Link to="/">
          <i className="fa-solid fa-clapperboard"></i>
          <span className="title">Movie Hub</span>
        </Link>
      </div>
      <div className="nav-link">
        <Link to="/">
          <i className="fa-solid fa-house"></i> Home
        </Link>
        <Link to="/movies">
          <i className="fa-solid fa-film"></i> Movies
        </Link>
        <Link to="/tvSeries">
          <i className="fa-solid fa-tv"></i> TV Series
        </Link>
      </div>
      <SearchForm />
    </div>
  );
}

export default NavBar;
