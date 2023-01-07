import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";

function SearchForm() {
  const currentPage = useSelector((state) => state.currentPg);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reference = useRef();

  useEffect(() => {
    handleSearch();
  }, [currentPage]);

  const handleSearch = async () => {
    const searchQuery = reference.current.value;

    if (searchQuery.length > 0) {
      let response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=5267b00cdf764bc75046eff3d46be3e2&language=en-US&query=${searchQuery}&page=${currentPage}&include_adult=false`
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
    }
  };

  return (
    <div className="search">
      <input
        onKeyDown={handleSearchOnEnterKey}
        ref={reference}
        type="text"
        placeholder="Search Movie or Series"
        className="search-area"
        spellCheck="false"
        autoFocus
        required
      />

      <i onClick={handleSearch} className="fa-solid fa-magnifying-glass"></i>
    </div>
  );
}

export default SearchForm;
