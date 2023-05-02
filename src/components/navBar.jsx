import { Link, useLocation } from "react-router-dom";
import SearchForm from "./searchForm";
import { useState } from "react";
import NavLinks from "./navLinks";

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
    <div className="nav-bar flex items-center bg-black fixed top-0 left-0 w-full z-10 border-b border-zinc-800 flex-col flex-wrap justify-center p-4 lg:flex-row lg:justify-between lg:py-4 lg:px-10 lg:flex-nowrap">
      <div className="logo-title flex items-center text-xl mb-4 lg:mb-0 font-prosto font-bold py-1 px-[7px] rounded-[5px]  bg-[rgb(245,197,24)]">
        <Link to="/" className="no-underline text-gray-800">
          <i className="fa-solid fa-clapperboard "></i>
          <span className="title ml-2 ">Mv-Hub</span>
        </Link>
      </div>
      <NavLinks
        key="nav-links"
        activeRoute={activeRoute}
        menuToggle={menuToggle}
        onClick={handleLinkClick}
      />

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
