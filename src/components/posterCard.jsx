import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import loadingSvg from "../images/loading2.svg";
import BookmarkTag from "./bookmarkTag";

function PosterCard({
  posterImgPath,
  rating,
  title,
  date,
  index,
  tag,
  movieId,
  posterCardData,
}) {
  const [loaded, setLoaded] = useState(false);
  const user = useSelector((state) => state.user);
  const isLogged = useSelector((state) => state.isLogged);
  const watchlist = useSelector((state) => state.watchlist);
  const [isItemInWatchlist, setIsItemInWatchlist] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const baseUri = process.env.REACT_APP_BASE_URI;

  const handleCardClick = async (index, id) => {
    dispatch({ type: "CARD_CLICKED" });
    dispatch({ type: "SET_CLICKED_CARD_INDEX", payload: index });
    dispatch({ type: "SET_REF_CARD_INDEX", payload: index });

    let res = await fetch(
      `https://api.themoviedb.org/3/${tag}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&append_to_response=videos,credits`
    );
    let modal_data = await res.json();

    dispatch({
      type: "UPDATE_MODAL_DATA",
      payload: modal_data,
    });
  };

  const updateWatchlist = async (id) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/${tag}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&append_to_response=videos,credits`
      );
      let watchlistItem = await response.json();
      //add tag to watchlistItem posted to backend
      watchlistItem.tag = tag;
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(watchlistItem),
      };

      const res =
        isLogged &&
        user &&
        (await fetch(
          `${baseUri}/api/v1/user/${user.id}/watchlist`,
          requestOptions
        ));
      const update_response = await res.json();
      console.log(update_response);
    } catch (error) {
      console.log(error);
    }
  };

  const getWatchlist = async () => {
    try {
      const response =
        isLogged &&
        user &&
        (await fetch(`${baseUri}/api/v1/user/${user.id}/watchlist`));
      const response_data = await response.json();
      dispatch({
        type: "SET_WATCHLIST",
        payload: response_data.watchlist,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteWatchlist = async (watchlistItemId) => {
    try {
      const response =
        isLogged &&
        user &&
        (await fetch(
          `${baseUri}/api/v1/user/${user.id}/watchlist/${watchlistItemId}`,
          { method: "DELETE", headers: { "Content-Type": "application/json" } }
        ));
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBookmarkClick = async (event, id) => {
    event.stopPropagation();
    if (!isLogged) {
      navigate("/sign-in");
    }
    if (!isItemInWatchlist) {
      await updateWatchlist(id);
    }
    if (isItemInWatchlist) {
      await deleteWatchlist(id);
    }
    await getWatchlist();
  };

  useEffect(() => {
    const isInWatchlist =
      watchlist &&
      watchlist.some((watchlistItem) => watchlistItem.id === movieId);
    if (isInWatchlist) {
      setIsItemInWatchlist(true);
    }
    if (!isInWatchlist) {
      setIsItemInWatchlist(false);
    }
  }, [watchlist]);

  const handleLoad = () => {
    setLoaded(true);
  };

  let image =
    posterImgPath === null
      ? "./no-poster.jpg"
      : `https://image.tmdb.org/t/p/w500${posterImgPath}`;
  return (
    <>
      <div
        onClick={() => handleCardClick(index, movieId)}
        className="card flex flex-col justify-between border border-zinc-800 bg-zinc-800 rounded-[0_0_5px_5px] cursor-pointer transition duration-[0.1s] lg:hover:scale-[0.97] min-h-[21rem] w-[10rem] sm:w-[11rem] sm:min-h-[24rem] md:min-h-[25rem] md:w-[12rem] lg:min-h-[26rem] "
      >
        {!posterCardData && (
          <div className="loading-placeholder w-full h-full flex justify-center items-center">
            <img
              src={loadingSvg}
              alt="loading"
              className="w-[30px] h-[30px] animate-spin-slow"
            />
          </div>
        )}
        {posterCardData && (
          <>
            {!loaded && (
              <div className="loading-placeholder relative w-full h-full flex justify-center items-center">
                <BookmarkTag
                  key="bookmark"
                  isItemInWatchlist={isItemInWatchlist}
                  onClick={(event) => handleBookmarkClick(event, movieId)}
                />
                <img
                  src={loadingSvg}
                  alt="loading"
                  className="w-[30px] h-[30px] animate-spin-slow"
                />
              </div>
            )}
            <div className="relative">
              {loaded && (
                <BookmarkTag
                  key="bookmark"
                  isItemInWatchlist={isItemInWatchlist}
                  onClick={(event) => handleBookmarkClick(event, movieId)}
                />
              )}

              <img
                src={image}
                alt="poster"
                className="poster"
                onLoad={handleLoad}
                style={{ display: loaded ? "inline-block" : "none" }}
              />
            </div>

            <span className="rating text-white font-roboto m-[0.6rem]">
              <span>
                <i className="fa-solid fa-star text-[goldenrod]"></i>
              </span>{" "}
              {rating}
            </span>
            <p className="movie-title text-white text-center px-[0.25rem] text-[0.75rem] sm:text-[0.8.5rem] font-prosto">
              {title}
            </p>
            <div className="type-date flex p-[0.4rem] mx-[0.6rem] mb-4 mt-2 justify-between text-[rgb(163,163,163)] bg-white/10 rounded-[5px] flex-col-reverse text-center sm:flex-row">
              <p className="type text-yellow-400 text-[0.8rem] sm:text-[0.9rem] font-medium">
                {tag}
              </p>
              <span className="date text-sky-400 text-[0.93rem] font-medium ">
                {date}
              </span>
            </div>
          </>
        )}
      </div>
    </>
  );
}
export default PosterCard;
