import { Link } from "react-router-dom";
function NavBar() {
  return (
    <div className="nav-bar">
      <div className="logo-title">
        <Link to="/">
          <i className="fa-solid fa-clapperboard"></i>
          <span className="title">MOVIE HUB</span>
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
      <div className="search">
        <input
          type="text"
          placeholder="Search Movie or Series"
          className="search-area"
          spellCheck="false"
          autoFocus
        />
        <Link to="/search">
          <i className="fa-solid fa-magnifying-glass"></i>
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
