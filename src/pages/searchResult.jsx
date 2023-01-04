import PaginatedDisplay from "../components/paginatedDisplay";
import { useState, createContext } from "react";
import { useLocation } from "react-router-dom";

export const PageContextSearch = createContext();

function SearchResult() {
  const [currentPage, setCurrentPage] = useState(1);
  const [returnedPage, setReturnedPage] = useState(1);

  const searchInfo = useLocation().state;

  console.log("lvl:2", searchInfo);

  return (
    <div className="outlet-bg">
      <span className="tv-header">Search Result</span>
      <PageContextSearch.Provider
        value={{
          value1: currentPage,
          value2: setCurrentPage,
        }}
      >
        <PaginatedDisplay
          movieData={searchInfo}
          pgNumDisplayLimit={5}
          pages={returnedPage}
          activePage="search"
        />
      </PageContextSearch.Provider>
    </div>
  );
}

export default SearchResult;
