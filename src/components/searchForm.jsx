import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";

function SearchForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery) {
      dispatch({ type: "SET_SEARCH_QUERY", payload: searchQuery });
      dispatch({ type: "RESET_CURRENT_PAGE" });
      navigate("search-result");
    }
  };

  const handleSearchOnEnterKey = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleOnClick = () => {
    handleSearch();
  };

  return (
    <>
      <div className="search w-full flex items-center rounded-[4px] bg-slate-200 p-1 ">
        <input
          onKeyDown={handleSearchOnEnterKey}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          placeholder="Search Movie or Series"
          className="search-area font-medium w-full outline-none indent-2 text-black bg-slate-200"
          spellCheck="false"
          autoFocus
          required
        />

        <BsSearch
          onClick={handleOnClick}
          className=" text-zinc-600 mx-2 text-xl hover:cursor-pointer "
        />
      </div>
    </>
  );
}

export default SearchForm;
