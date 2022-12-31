import { useState } from "react";
import PosterCard from "./posterCard";

function Pagination({ data, cardDisplayLimit, pgNumDisplayLimit }) {
  const [pages] = useState(Math.round(data.length / cardDisplayLimit));
  const [currentPage, setCurrentPage] = useState(1);

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const changePage = (event) => {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  };

  const getPaginatedData = () => {
    const startIndex = currentPage * cardDisplayLimit - cardDisplayLimit;
    const endIndex = startIndex + cardDisplayLimit;
    return data.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    let start =
      Math.floor((currentPage - 1) / pgNumDisplayLimit) * pgNumDisplayLimit;
    return new Array(pgNumDisplayLimit).fill().map((_, idx) => start + idx + 1);
  };

  return <></>;
}

export default Pagination;
