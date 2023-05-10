import { Link, useLocation } from "react-router-dom";
import SearchForm from "./searchForm";
import { useState } from "react";
import NavLinks from "./navLinks";
import { BsBookmarkPlusFill } from "react-icons/bs";
import { useSelector } from "react-redux";

function NavBar() {
  const [menuToggle, setMenuToggle] = useState(false);
  const location = useLocation();
  const activeRoute = location.pathname;
  const watchlistCounter = useSelector((state) => state.watchlistCounter);

  const handleMenu = () => {
    setMenuToggle(!menuToggle);
  };

  const handleLinkClick = () => {
    setMenuToggle(false);
  };
  return (
    <div className="nav-bar flex flex-col bg-black fixed top-0 left-0 w-full z-50 p-4 justify-between lg:py-4 lg:px-10">
      <div className="upper-nav flex justify-between">
        <div className="logo-title flex items-center lg:text-xl font-prosto font-bold py-1 px-[7px] rounded-[5px]  bg-[rgb(245,197,24)]">
          <Link to="/" className="no-underline text-gray-700">
            <i className="fa-solid fa-clapperboard "></i>
            <span className="title ml-2 ">Mv-Hub</span>
          </Link>
        </div>
        <div className="search-links flex flex-col items-center sm:items-stretch  sm:w-[50%]">
          <SearchForm />
        </div>

        <div className="user flex font-ubuntu">
          <Link
            to="/watchlist"
            className="watch-list mr-2 text-zinc-300 font-medium rounded cursor-pointer lg:hover:bg-zinc-800 py-1 px-[9px] sm:text-[1.05rem]"
          >
            <BsBookmarkPlusFill className="inline-block mr-1 " />{" "}
            <span className="hidden md:inline-block">Watchlist</span>{" "}
            <span className="inline-block text-[yellow]">
              {watchlistCounter && watchlistCounter > 0 ? watchlistCounter : ""}
            </span>
          </Link>
          <Link
            to="/sign-in"
            className="sign-in block text-zinc-300 font-medium rounded cursor-pointer lg:hover:bg-zinc-800 py-1 px-[9px] sm:text-[1.05rem]"
          >
            Sign In
          </Link>
        </div>
        <div
          className="menu-container text-white text-3xl sm:hidden"
          onClick={handleMenu}
        >
          {!menuToggle && <i className="hamburger fa-solid fa-bars"></i>}
          {menuToggle && <i className=" close fa-solid fa-xmark"></i>}
        </div>
      </div>
      <NavLinks
        key="nav-links"
        activeRoute={activeRoute}
        menuToggle={menuToggle}
        onClick={handleLinkClick}
      />
    </div>
  );
}

export default NavBar;
