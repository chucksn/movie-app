import PaginatedDisplay from "../components/paginatedDisplay";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function SearchResult() {
  const returnedPage = useSelector((state) => state.returnedPg);
  const searchInfo = useSelector((state) => state.search);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "RESET" }); //resets searchResult
  }, []);

  return (
    <div className="outlet-bg">
      <span className="tv-header">Search Result</span>

      <PaginatedDisplay
        movieData={searchInfo.searchResult}
        pgNumDisplayLimit={5}
        pages={returnedPage}
        activePage="search"
      />
    </div>
  );
}

export default SearchResult;
