import { Link } from "react-router-dom";
import SearchForm from "./searchForm";
import { useState } from "react";

function NavBar() {
  const [menuToggle, setMenuToggle] = useState(false);
  const [linkClicked, setLinkClickStatus] = useState(false);

  const handleMenu = () => {
    setMenuToggle(!menuToggle);
    setLinkClickStatus(false);
  };

  const handleLinkClick = () => {
    setLinkClickStatus(true);
    setMenuToggle(false);
  };
  return (
    <div className="nav-bar flex items-center bg-black fixed top-0 left-0 w-full z-10 border-b border-zinc-800 flex-col flex-wrap justify-center p-4 lg:flex-row lg:justify-between lg:py-4 lg:px-5 lg:flex-nowrap">
      <div className="logo-title">
        <Link to="/">
          <i className="fa-solid fa-clapperboard"></i>
          <span className="title">Movie Hub</span>
        </Link>
      </div>
      <div
        className={`nav-link flex items-center ${menuToggle ? "visible" : ""} ${
          linkClicked ? "hidden" : ""
        }`}
      >
        <Link
          to="/"
          onClick={handleLinkClick}
          className="no-underline font-medium mx-8 text-zinc-400 lg:text-lg"
        >
          <i className="fa-solid fa-house "></i> Home
        </Link>
        <Link
          to="/movies"
          onClick={handleLinkClick}
          className="no-underline font-medium mx-8 text-zinc-400 lg:text-lg"
        >
          <i className="fa-solid fa-film"></i> Movies
        </Link>
        <Link
          to="/tvSeries"
          onClick={handleLinkClick}
          className="no-underline font-medium mx-8 text-zinc-400 lg:text-lg"
        >
          <i className="fa-solid fa-tv"></i> TV Series
        </Link>
      </div>

      <SearchForm />
      <div className="menu-container" onClick={handleMenu}>
        {!menuToggle && <i className="hamburger fa-solid fa-bars"></i>}
        {menuToggle && <i className=" close fa-solid fa-xmark"></i>}
      </div>
    </div>
  );
}

export default NavBar;
