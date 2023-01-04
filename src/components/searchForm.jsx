import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchForm() {
  const [searchInfoList, setSearchInfoList] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const handleSearch = () => {
    const getInfo = async () => {
      let response = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=5267b00cdf764bc75046eff3d46be3e2&language=en-US&query=john&page=${currentPage}&include_adult=false`
      );
      let data = await response.json();
      setSearchInfoList(data.results);
    };

    getInfo();

    navigate({
      pathname: "/search-result",
      state: { searchInfoList },
    });
  };
  console.log("lvl:0", searchInfoList);
  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search Movie or Series"
        className="search-area"
        spellCheck="false"
        autoFocus
      />

      <i onClick={handleSearch} className="fa-solid fa-magnifying-glass"></i>
    </div>
  );
}

export default SearchForm;
