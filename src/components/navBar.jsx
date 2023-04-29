import { Link, useLocation } from "react-router-dom";
import SearchForm from "./searchForm";
import { useState } from "react";

function NavBar() {
  const [menuToggle, setMenuToggle] = useState(false);
  const location = useLocation();
  const activeRoute = location.pathname;

  const handleMenu = () => {
    setMenuToggle(!menuToggle);
  };

  const handleLinkClick = () => {
    setMenuToggle(false);
  };
  return (
    <div className="nav-bar flex items-center bg-black fixed top-0 left-0 w-full z-10 border-b border-zinc-800 flex-col flex-wrap justify-center p-4 lg:flex-row lg:justify-between lg:py-4 lg:px-8 lg:flex-nowrap">
      <div className="logo-title flex items-center text-xl mb-4 lg:mb-0 font-prosto font-bold p-2 rounded-lg shadow-[0_0_4px_1px_rgb(182,148,61)] bg-[rgb(30,11,30)]">
        <Link to="/" className="no-underline text-[rgb(170,152,94)]">
          <i className="fa-solid fa-clapperboard "></i>
          <span className="title ml-2 ">Movie-Hub</span>
        </Link>
      </div>
      <div
        className={`nav-link items-center sm:flex sm:flex-row flex-col justify-around sm:w-full sm:justify-center sm:mb-4 lg:w-fit mb-0 ${
          menuToggle ? "flex" : "hidden"
        } `}
      >
        <Link
          to="/"
          onClick={handleLinkClick}
          className={`no-underline font-medium my-2 sm:my-0 mx-8 lg:text-lg hover:text-sky-400 ${
            activeRoute === "/" ? "text-sky-400" : "text-zinc-300"
          }`}
        >
          <i className="fa-solid fa-house "></i> Home
        </Link>
        <Link
          to="/movies"
          onClick={handleLinkClick}
          className={`no-underline font-medium my-2 sm:my-0 mx-8 lg:text-lg hover:text-sky-400 ${
            activeRoute === "/movies" ? "text-sky-400" : "text-zinc-300"
          }`}
        >
          <i className="fa-solid fa-film"></i> Movies
        </Link>
        <Link
          to="/tvSeries"
          onClick={handleLinkClick}
          className={`no-underline font-medium my-2 sm:my-0 mx-8 lg:text-lg hover:text-sky-400 ${
            activeRoute === "/tvSeries" ? "text-sky-400" : "text-zinc-300"
          }`}
        >
          <i className="fa-solid fa-tv"></i> TV Series
        </Link>
      </div>

      <SearchForm />
      <div
        className="menu-container text-white fixed top-16 right-4 text-3xl sm:hidden"
        onClick={handleMenu}
      >
        {!menuToggle && <i className="hamburger fa-solid fa-bars"></i>}
        {menuToggle && <i className=" close fa-solid fa-xmark"></i>}
      </div>
    </div>
  );
}

export default NavBar;
