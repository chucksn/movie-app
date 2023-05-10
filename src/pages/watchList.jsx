import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PaginatedDisplay from "../components/paginatedDisplay";
import { useEffect, useState } from "react";

function WatchList() {
  const isLogged = useSelector((state) => state.isLogged);
  const navigate = useNavigate();
  const [watchlist, setWatchlist] = useState(null);
  const [pages, setPages] = useState(1);
  const currentPg = useSelector((state) => state.currentPg);
  const dispatch = useDispatch();

  const host = process.env.REACT_APP_HOST;
  const port = process.env.REACT_APP_PORT;

  useEffect(() => {
    const getWatchlist = async () => {
      const res = await fetch(
        `http://${host}:${port}/api/v1/user/645748e380e1666087b19b94/watchlist?page=${currentPg}`
      );
      const data = await res.json();
      dispatch({
        type: "SET_WATCHLIST_COUNTER",
        payload: data.watchlistLength,
      });
      console.log(data);
    };
    getWatchlist();
  }, [watchlist]);

  const handleBtnClick = () => {
    navigate("/sign-in");
  };
  return (
    <div className="watch-list min-h-screen w-full bg-black/90 py-[72px] px-2 sm:py-32 sm:px-4 md:px-7 lg:px-2">
      <span className="watch-list-header text-[rgb(184,184,187)] text-center block font-light mt-2 font-unbounded sm:text-[1.2rem] md:text-[1.4rem]">
        Watchlist
      </span>
      <div className="watchlist-ctn w-full mt-24">
        {!isLogged && (
          <div className="watchlist-no-login-ctn w-full flex flex-col items-center">
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
      </div>
    </div>
  );
}

export default WatchList;
