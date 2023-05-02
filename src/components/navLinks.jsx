import { Link } from "react-router-dom";

function NavLinks({ menuToggle, onClick, activeRoute }) {
  return (
    <div
      className={`nav-links items-center sm:flex sm:flex-row flex-col justify-around sm:w-full sm:justify-center sm:mb-4 lg:mb-0 lg:w-fit mb-0 ${
        menuToggle ? "flex" : "hidden"
      } `}
    >
      <Link
        to="/"
        onClick={onClick}
        className={`no-underline font-medium my-2 sm:my-0 mx-8 hover:text-sky-400 ${
          activeRoute === "/" ? "text-sky-400" : "text-zinc-300"
        }`}
      >
        <i className="fa-solid fa-house "></i> Home
      </Link>
      <Link
        to="/movies"
        onClick={onClick}
        className={`no-underline font-medium my-2 sm:my-0 mx-8 hover:text-sky-400 ${
          activeRoute === "/movies" ? "text-sky-400" : "text-zinc-300"
        }`}
      >
        <i className="fa-solid fa-film"></i> Movies
      </Link>
      <Link
        to="/tvSeries"
        onClick={onClick}
        className={`no-underline font-medium my-2 sm:my-0 mx-8 hover:text-sky-400 ${
          activeRoute === "/tvSeries" ? "text-sky-400" : "text-zinc-300"
        }`}
      >
        <i className="fa-solid fa-tv"></i> TV Series
      </Link>
    </div>
  );
}

export default NavLinks;
