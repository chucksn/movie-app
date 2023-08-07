import { Link, useLocation } from "react-router-dom";
import SearchForm from "./searchForm";
import { useState } from "react";
import NavLinks from "./navLinks";
import { BsBookmarkPlusFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { AiFillCaretDown } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { MdOutlineSearchOff } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import logo from "../images/mv-hub-logo.svg";
import capitalizeWords from "../utils/capitalize";

function NavBar() {
  const [menuToggle, setMenuToggle] = useState(false);
  const [showSmScreenSearch, setShowSmScreenSearch] = useState(false);
  const location = useLocation();
  const activeRoute = location.pathname;
  const watchlist = useSelector((state) => state.watchlist);
  const isLogged = useSelector((state) => state.isLogged);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleMenu = () => {
    setMenuToggle(!menuToggle);
  };

  const handleLinkClick = () => {
    setMenuToggle(false);
  };

  const handleUserProfileClick = () => {
    dispatch({ type: "TOGGLE_USER_MENU" });
  };

  const handleSmScreenSearchClick = () => {
    setShowSmScreenSearch(!showSmScreenSearch);
  };

  return (
    <div className="nav-bar flex flex-col bg-black fixed top-0 left-0 w-full z-50 p-4 justify-between lg:py-4 lg:px-10">
      <div className="upper-nav flex justify-between items-center">
        <Link
          to="/"
          className="logo w-[96px] h-[34.84px] lg:w-[106px] lg:h-[38.46px] bg-sky-950 border border-teal-800 py-[1px] pl-[2px] rounded-lg"
          onClick={handleLinkClick}
        >
          <img src={logo} alt="logo" />
        </Link>
        <div className="search hidden sm:flex  sm:w-[50%]">
          <SearchForm />
        </div>
        <div
          className="sm-screen-search sm:hidden hover:cursor-pointer mx-2"
          onClick={handleSmScreenSearchClick}
        >
          {!showSmScreenSearch && (
            <BsSearch className="text-slate-200 text-xl block " />
          )}
          {showSmScreenSearch && (
            <MdOutlineSearchOff className="text-slate-200 text-2xl block " />
          )}
        </div>

        <div className="user flex font-ubuntu">
          <Link
            to="/watchlist"
            className="watch-list mr-2 text-zinc-300 font-medium rounded cursor-pointer lg:hover:bg-zinc-800 py-1 px-[9px] sm:text-[1.05rem]"
          >
            <BsBookmarkPlusFill className="inline-block mr-1 " />{" "}
            <span className="hidden md:inline-block">Watchlist</span>{" "}
            {isLogged && (
              <span className="inline-block text-[yellow]">
                {watchlist?.length > 0 ? watchlist.length : ""}
              </span>
            )}
          </Link>
          {!isLogged && (
            <Link
              to="/sign-in"
              className="sign-in block text-zinc-300 font-medium rounded cursor-pointer lg:hover:bg-zinc-800 py-1 px-[9px] sm:text-[1.05rem]"
            >
              Sign In
            </Link>
          )}
          {isLogged && user && (
            <span
              onClick={handleUserProfileClick}
              className="user block text-zinc-300 font-medium rounded cursor-pointer lg:hover:bg-zinc-800 py-1 px-[9px] text-[1.3rem] sm:text-[1.05rem]"
            >
              <CgProfile className="inline" />{" "}
              <span className="hidden sm:inline-block">
                {capitalizeWords(user.name).split(" ")[0]}
              </span>{" "}
              <AiFillCaretDown className="inline" />
            </span>
          )}
        </div>
        <div
          className="menu-container text-white text-3xl sm:hidden"
          onClick={handleMenu}
        >
          {!menuToggle && <i className="hamburger fa-solid fa-bars"></i>}
          {menuToggle && <i className=" close fa-solid fa-xmark"></i>}
        </div>
      </div>
      {showSmScreenSearch && (
        <div className="search flex justify-center mt-3 w-full sm:hidden">
          <SearchForm />
        </div>
      )}
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
