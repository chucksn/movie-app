import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { Autoplay, Navigation } from "swiper";
import MainSlideCard from "../components/mainSlideCard";
import NextSlideCard from "../components/nextSlideCard";
import PosterCard from "../components/posterCard";
import { useDispatch, useSelector } from "react-redux";
import VideoWindow from "../components/videoWindow";
import MovieDetailModal from "../components/modal";
import tailSpinLoader from "../images/tail-spin.svg";

function Home() {
  const [nowPlayingList, setNowPlayingList] = useState(null);
  const [trendingList, setTrendingList] = useState(null);
  const [topRatedList, setTopRatedList] = useState(null);
  const [trendingPeriod, setTrendingPeriod] = useState("day");
  const [selectOpened, setOpenStatus] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [nextSlideList, setNextSlideList] = useState([]);
  const leftNavRef = useRef();
  const rightNavRef = useRef();
  const dispatch = useDispatch();
  const mainSlideVideoList = useSelector((state) => state.mainSlideVideoList);
  const mainSlideClicked = useSelector((state) => state.mainSlideCardClicked);
  const cardClicked = useSelector((state) => state.cardClicked);
  const modalData = useSelector((state) => state.modalData);
  const selectRef = useRef();

  const videoInfo =
    mainSlideClicked &&
    mainSlideVideoList.filter((videoInfo) => {
      return videoInfo.type === "Trailer";
    });

  const youtubeKey = videoInfo.length > 0 ? videoInfo[0].key : null;

  const videoPath = youtubeKey
    ? `https://www.youtube.com/embed/${youtubeKey}?&autoplay=1`
    : null;

  useEffect(() => {
    const getNowPlaying = async () => {
      let response = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=5267b00cdf764bc75046eff3d46be3e2&language=en-US&page=1`
      );
      let data = await response.json();
      setNowPlayingList(data.results);
    };

    getNowPlaying();
  }, []);

  useEffect(() => {
    if (nowPlayingList && nowPlayingList.length > 0) {
      const reorderedList = [
        ...nowPlayingList.slice(currentSlideIndex + 1),
        ...nowPlayingList.slice(0, currentSlideIndex + 1),
      ];
      setNextSlideList(reorderedList.slice(0, 3));
    }
  }, [currentSlideIndex, nowPlayingList]);

  useEffect(() => {
    const getTrending = async () => {
      let response = await fetch(
        `https://api.themoviedb.org/3/trending/all/${trendingPeriod}?api_key=5267b00cdf764bc75046eff3d46be3e2`
      );
      let data = await response.json();
      setTrendingList(data.results);
    };
    getTrending();
  }, [trendingPeriod]);

  useEffect(() => {
    const getTopRated = async () => {
      let response = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=5267b00cdf764bc75046eff3d46be3e2&language=en-US&page=1`
      );
      let data = await response.json();
      setTopRatedList(data.results);
    };
    getTopRated();
  }, []);

  const handleSlideChange = (swiper) => {
    setCurrentSlideIndex(swiper.realIndex);
  };

  const handleNav = () => {
    leftNavRef.current.style.display = "block";
    rightNavRef.current.style.display = "block";
  };

  const handleClickMainSlide = async (id) => {
    let response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=5267b00cdf764bc75046eff3d46be3e2&language=en-US&append_to_response=videos`
    );
    let data = await response.json();
    dispatch({
      type: "UPDATE_MAIN_SLIDE_VIDEO_LIST_DATA",
      payload: data.videos.results,
    });

    dispatch({
      type: "MAIN_SLIDE_CARD_CLICKED",
    });
  };

  const handleCardClick = async (tvType, id) => {
    dispatch({ type: "CARD_CLICKED" });

    let res = await fetch(
      `https://api.themoviedb.org/3/${tvType}/${id}?api_key=5267b00cdf764bc75046eff3d46be3e2&language=en-US&append_to_response=videos,credits`
    );
    let fetchedModalData = await res.json();
    dispatch({
      type: "UPDATE_MODAL_DATA",
      payload: fetchedModalData,
    });
  };

  const handleSelectTrending = () => {
    setOpenStatus(!selectOpened);
    if (!selectOpened) {
      selectRef.current.style.display = "block";
    } else {
      selectRef.current.style.display = "none";
    }
  };

  const handleDayTrend = () => {
    setTrendingPeriod("day");
    setOpenStatus(false);
    selectRef.current.style.display = "none";
  };

  const handleWeekTrend = () => {
    setTrendingPeriod("week");
    setOpenStatus(false);
    selectRef.current.style.display = "none";
  };

  const swiperStyle = {
    display: "flex",
    justifyContent: "center",
  };

  const emptyOutletStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "teal",
    fontSize: "5rem",
  };

  return (
    <>
      {!nowPlayingList && (
        <div style={emptyOutletStyle} className="outlet-bg-empty-search">
          <img src={tailSpinLoader} alt="loading" />
        </div>
      )}

      {nowPlayingList && trendingList && topRatedList && (
        <div className="outlet-bg">
          <div className="home-main">
            <span className="tv-header">Now Playing</span>
            <div className="home-slideshow">
              <div className="main-slide-ctn">
                {nowPlayingList && (
                  <>
                    <i
                      onMouseEnter={handleNav}
                      ref={rightNavRef}
                      className="fa-solid fa-caret-right"
                    ></i>
                    <i
                      onMouseEnter={handleNav}
                      ref={leftNavRef}
                      className="fa-solid fa-caret-left"
                    ></i>
                    <Swiper
                      onSlideChange={handleSlideChange}
                      spaceBetween={30}
                      centeredSlides={true}
                      navigation={{
                        nextEl: ".fa-caret-right",
                        prevEl: ".fa-caret-left",
                      }}
                      loop={true}
                      autoplay={{
                        delay: 3000,
                        disableOnInteraction: true,
                      }}
                      modules={[Autoplay, Navigation]}
                      className="mySwiper"
                    >
                      {nowPlayingList.map((data) => (
                        <SwiperSlide>
                          <MainSlideCard
                            onClick={() => handleClickMainSlide(data.id)}
                            key={data.id}
                            posterImgPath={data.backdrop_path}
                            title={data.title}
                            year={data.release_date}
                            leftNavRef={leftNavRef}
                            rightNavRef={rightNavRef}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    {videoPath && mainSlideClicked && (
                      <VideoWindow videoUrl={videoPath} />
                    )}
                  </>
                )}
              </div>
              <div className="next-slide-ctn">
                <span className="up-next-txt">UP NEXT</span>
                <div className="next-slide-swiper-ctn">
                  {nowPlayingList && (
                    <>
                      {nextSlideList.map((data, index) => (
                        <NextSlideCard
                          posterImgPath={data.poster_path}
                          key={index}
                          title={data.title}
                          year={data.release_date}
                        />
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="trending-ctn">
            <span
              style={{ marginBottom: "1rem", position: "relative" }}
              className="tv-header"
            >
              TRENDING {trendingPeriod === "day" && "TODAY"}
              {trendingPeriod === "week" && "THIS WEEK"}{" "}
              <span
                className="select-toggle-ctn"
                onClick={handleSelectTrending}
              >
                {!selectOpened && (
                  <i className="closed-select fa-solid fa-chevron-down"></i>
                )}
                {selectOpened && (
                  <i className="opened-select fa-solid fa-chevron-up"></i>
                )}
              </span>
              <span className="select-options" ref={selectRef}>
                <span className="today" onClick={handleDayTrend}>
                  Today
                </span>
                <span className="this-week" onClick={handleWeekTrend}>
                  This Week
                </span>
              </span>
            </span>

            <div className="trending-inner-ctn">
              {trendingList && (
                <>
                  <i className="fa-solid fa-chevron-left"></i>
                  <Swiper
                    spaceBetween={30}
                    navigation={{
                      nextEl: ".fa-chevron-right",
                      prevEl: ".fa-chevron-left",
                    }}
                    breakpoints={{
                      360: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                      },
                      640: {
                        slidesPerView: 3,
                      },
                      1024: {
                        slidesPerView: 4,
                      },
                      1200: {
                        slidesPerView: 5,
                      },
                      1440: {
                        slidesPerView: 6,
                      },
                      1800: {
                        slidesPerView: 7,
                      },
                    }}
                    modules={[Navigation]}
                  >
                    {trendingList.map((data) => (
                      <SwiperSlide style={swiperStyle}>
                        <PosterCard
                          onClick={() =>
                            handleCardClick(data.media_type, data.id)
                          }
                          key={data.id}
                          posterImgPath={data.poster_path}
                          date={data.release_date || data.first_air_date}
                          rating={data.vote_average}
                          title={data.title || data.name}
                          type={data.media_type}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <i className="fa-solid fa-chevron-right"></i>
                </>
              )}
            </div>
          </div>
          <div className="top-rated-ctn">
            <span style={{ marginBottom: "1rem" }} className="tv-header">
              TOP RATED
            </span>
            <div className="top-rated-inner-ctn">
              {topRatedList && (
                <>
                  <i className="fa-solid fa-angle-left"></i>
                  <Swiper
                    spaceBetween={30}
                    navigation={{
                      nextEl: ".fa-angle-right",
                      prevEl: ".fa-angle-left",
                    }}
                    breakpoints={{
                      360: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                      },
                      640: {
                        slidesPerView: 3,
                      },
                      1024: {
                        slidesPerView: 4,
                        navigation: true,
                      },
                      1200: {
                        slidesPerView: 5,
                      },
                      1440: {
                        slidesPerView: 6,
                      },
                      1800: {
                        slidesPerView: 7,
                      },
                    }}
                    modules={[Navigation]}
                  >
                    {topRatedList.map((data) => (
                      <SwiperSlide style={swiperStyle}>
                        <PosterCard
                          onClick={() => handleCardClick("movie", data.id)}
                          key={data.id}
                          posterImgPath={data.poster_path}
                          date={data.release_date || data.first_air_date}
                          rating={data.vote_average}
                          title={data.title || data.name}
                          type={data.media_type}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <i className="fa-solid fa-angle-right"></i>
                </>
              )}
            </div>
          </div>
          {cardClicked && modalData && (
            <MovieDetailModal
              castData={modalData.credits.cast}
              modalPosterPath={modalData.poster_path}
              movieTitle={modalData.name || modalData.title}
              overview={modalData.overview}
              tagline={modalData.tagline}
              videosInfoList={modalData.videos.results}
              year={
                modalData.release_date ? modalData.release_date.slice(0, 4) : ""
              }
              key={modalData.id}
            />
          )}
        </div>
      )}
    </>
  );
}

export default Home;
