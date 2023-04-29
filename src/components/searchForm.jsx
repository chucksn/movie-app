import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";

function SearchForm() {
  const currentPage = useSelector((state) => state.currentPg);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reference = useRef();

  const searchToggle = useSelector((state) => state.toggle);

  useEffect(() => {
    handleSearch();
  }, [currentPage, searchToggle]);

  const handleSearch = async () => {
    const searchQuery = reference.current.value;

    if (searchQuery.length > 0) {
      let response = await fetch(
        `https://api.themoviedb.org/3/search/${searchToggle}?api_key=5267b00cdf764bc75046eff3d46be3e2&language=en-US&query=${searchQuery}&page=${currentPage}&include_adult=false`
      );
      let data = await response.json();
      let searchResult = data.results;
      let returnedPage = data.total_pages;

      dispatch({ type: "UPDATE_SEARCH", payload: searchResult });
      dispatch({ type: "UPDATE_RETURNED_PAGE", payload: returnedPage });

      navigate({
        pathname: "/search-result",
      });
    }
  };

  const handleSearchOnEnterKey = (event) => {
    if (event.key === "Enter") {
      handleSearch();
      dispatch({ type: "RESET" });
    }
  };

  const handleOnClick = () => {
    handleSearch();
    dispatch({ type: "RESET" });
  };

  return (
    <div className="search flex items-center mt-2 lg:mt-0">
      <input
        onKeyDown={handleSearchOnEnterKey}
        ref={reference}
        type="text"
        placeholder="Search Movie or Series"
        className="search-area p-1 md:text-lg rounded-lg outline-none indent-2 text-white bg-[rgb(40,40,40)]"
        spellCheck="false"
        autoFocus
        required
      />

      <i
        onClick={handleOnClick}
        className="fa-solid fa-magnifying-glass text-white ml-2 text-xl p-1 rounded-md hover:cursor-pointer hover:text-slate-400"
      ></i>
    </div>
  );
}

export default SearchForm;
