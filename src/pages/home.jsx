import MainSlideCard from "../components/homePgMovieCards";
import NextSlideCard from "../components/nextSlideCard";

function Home() {
  return (
    <div className="outlet-bg">
      <div className="home-main">
        <span className="tv-header">Now Playing</span>
        <div className="home-slideshow">
          <div className="main-slide-ctn">
            <MainSlideCard />
          </div>
          <div className="next-slide-ctn">
            <span className="up-next-txt">Up next</span>
            <div className="next-slide-swiper-ctn">
              <NextSlideCard />
            </div>
          </div>
        </div>
        <div className="trending-ctn"></div>
      </div>
    </div>
  );
}

export default Home;
