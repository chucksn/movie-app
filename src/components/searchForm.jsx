import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";

function SearchForm() {
  const currentPage = useSelector((state) => state.currentPg);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = useRef();

  const searchToggleState = useSelector((state) => state.searchToggleState);

  useEffect(() => {
    handleSearch();
  }, [currentPage, searchToggleState]);

  const handleSearch = async () => {
    const searchQuery = inputRef.current.value;

    if (searchQuery.length > 0) {
      let response = await fetch(
        `https://api.themoviedb.org/3/search/${searchToggleState}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchQuery}&page=${currentPage}&include_adult=false`
      );
      let data = await response.json();
      let searchResult = data.results;
      let returnedPage = data.total_pages;

      dispatch({ type: "UPDATE_SEARCH", payload: searchResult });
      dispatch({ type: "SEARCH_RETURNED_PAGES", payload: returnedPage });

      navigate({
        pathname: "/search-result",
      });
    }
  };

  const handleSearchOnEnterKey = (event) => {
    if (event.key === "Enter") {
      handleSearch();
      dispatch({ type: "RESET_CURRENT_PAGE" });
    }
  };

  const handleOnClick = () => {
    handleSearch();
    dispatch({ type: "RESET_CURRENT_PAGE" });
  };

  return (
    <div className="search flex items-center mt-2 lg:mt-0 rounded-[4px] bg-slate-200 p-1">
      <input
        onKeyDown={handleSearchOnEnterKey}
        ref={inputRef}
        type="text"
        placeholder="Search Movie or Series"
        className="search-area md:text-lg font-medium  outline-none indent-2 text-black bg-slate-200"
        spellCheck="false"
        autoFocus
        required
      />

      <i
        onClick={handleOnClick}
        className="fa-solid fa-magnifying-glass text-zinc-600 mx-2 text-xl   hover:cursor-pointer "
      ></i>
    </div>
  );
}

export default SearchForm;
