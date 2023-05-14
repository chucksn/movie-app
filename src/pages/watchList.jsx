import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PaginatedDisplay from "../components/paginatedDisplay";

function WatchList() {
  const isLogged = useSelector((state) => state.isLogged);
  const navigate = useNavigate();
  const watchlist = useSelector((state) => state.watchlist);
  const currentPg = useSelector((state) => state.currentPg);
  const displayLimit = 10;
  const pages = watchlist && Math.ceil(watchlist.length / displayLimit);
  const startIndex = (currentPg - 1) * displayLimit;
  const endIndex = currentPg * displayLimit;
  const paginatedWatchlist = watchlist && watchlist.slice(startIndex, endIndex);

  const handleBtnClick = () => {
    navigate("/sign-in");
  };
  return (
    <div className="watch-list min-h-screen w-full bg-black/90 py-[72px] px-2 sm:py-32 sm:px-4 md:px-7 lg:px-2">
      <span className="watch-list-header text-[rgb(184,184,187)] text-center block font-light mt-2 font-unbounded sm:text-[1.2rem] md:text-[1.4rem]">
        Watchlist
      </span>
      <div className="watchlist-ctn w-full ">
        {!isLogged && (
          <div className="watchlist-no-login-ctn w-full flex flex-col items-center mt-24">
            <span className=" block md:text-[1.07rem] text-[yellow]">
              Sign in to access your watchlist
            </span>
            <button
              onClick={handleBtnClick}
              type="button"
              className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-1 rounded-lg mt-7 outline-none"
            >
              Sign in
            </button>
          </div>
        )}
        {isLogged && watchlist && watchlist.length > 0 && (
          <PaginatedDisplay
            movieDataList={paginatedWatchlist}
            pages={pages}
            pgNumDisplayLimit={pages > 5 ? 5 : pages}
            key={"watchlist"}
            tag={"watchlist"}
          />
        )}
        {isLogged && watchlist && watchlist.length === 0 && (
          <span className="block text-yellow-200/70 text-center lg:text-[1.05rem] mt-40 p-8">
            Click on the bookmark icon with a plus on the top-left corner of a
            movie card to add/remove it to/from watchlist
          </span>
        )}
      </div>
    </div>
  );
}

export default WatchList;
