import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import loadingSvg from "../images/loading2.svg";
import { ImBookmark } from "react-icons/im";
import { AiOutlinePlus } from "react-icons/ai";
import { BsCheck2 } from "react-icons/bs";

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
  const isBookmarked = useSelector((state) => state.isBookmarked);
  const dispatch = useDispatch();

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

  const handleBookmarkClick = async (event, id) => {
    event.stopPropagation();

    const res = await fetch(
      `https://api.themoviedb.org/3/${tag}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&append_to_response=videos,credits`
    );
    const watchlistItem = await res.json();

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(watchlistItem),
    };

    fetch(
      "http://localhost:3002/api/v1/user/645748e380e1666087b19b94/watchlist",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error(error));
  };

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
        className="card flex flex-col justify-between border border-zinc-800 bg-zinc-800 rounded-[0_0_5px_5px] cursor-pointer transition duration-[0.1s] hover:scale-[0.97] min-h-[21rem] w-[10rem] sm:w-[11rem] sm:min-h-[24rem] md:min-h-[25rem] md:w-[12rem] lg:min-h-[26rem] "
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
              <div className="loading-placeholder w-full h-full flex justify-center items-center">
                <img
                  src={loadingSvg}
                  alt="loading"
                  className="w-[30px] h-[30px] animate-spin-slow"
                />
              </div>
            )}
            <div className="relative">
              <div
                className="bookmark absolute top-0 left-0 w-9 h-9 "
                onClick={(event) => handleBookmarkClick(event, movieId)}
              >
                <ImBookmark
                  className={`absolute left-0 top-0 text-4xl ${
                    isBookmarked ? "text-[yellow]" : "text-black/50"
                  } `}
                />
                {!isBookmarked && (
                  <AiOutlinePlus className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-100" />
                )}
                {isBookmarked && (
                  <BsCheck2 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-zinc-900" />
                )}
              </div>
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
