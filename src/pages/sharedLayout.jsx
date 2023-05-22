import { Outlet } from "react-router-dom";
import NavBar from "../components/navBar";
import Footer from "../components/footer";
import { useSelector, useDispatch } from "react-redux";
import MovieDetailModal from "../components/modal";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import UserMenu from "../components/userMenu";
import SessionExpirationPrompt from "../components/sessionExpirationPrompt";

function SharedLayout() {
  const modalData = useSelector((state) => state.modalData);
  const cardClicked = useSelector((state) => state.cardClicked);
  const clickedCardIndex = useSelector((state) => state.clickedCardIndex);
  const refCardIndex = useSelector((state) => state.refCardIndex);
  const dispatch = useDispatch();
  const location = useLocation();
  const baseUri = process.env.REACT_APP_BASE_URI;

  const handleScrollToTop = () => {
    window.scrollTo(0, 0, "smooth");
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const getWatchlist = async () => {
        const res = await fetch(`${baseUri}/api/v1/watchlist`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const data = await res.json();
        dispatch({ type: "LOGGED_IN" });
        dispatch({ type: "SET_USER", payload: user });
        dispatch({ type: "SET_WATCHLIST", payload: data.watchlist });
      };
      getWatchlist();
    }
  }, []);

  useEffect(() => {
    dispatch({ type: "RESET_CURRENT_PAGE" });
    dispatch({ type: "MODAL_DATA_RESET" });
    dispatch({ type: "RESET_CLICKED_CARD_INDEX" });
    dispatch({ type: "RESET_REF_CARD_INDEX" });
    dispatch({ type: "CARD_CLICK_RESET" });
    handleScrollToTop();
  }, [location.pathname]);

  return (
    <div className="bg w-full min-h-screen bg-[url('../src/images/william-daigneault-ju3eqN0gl6Y-unsplash.jpg')] bg-no-repeat bg-center bg-cover">
      <div className="overlay bg-zinc-600/60 w-full h-full">
        <NavBar />
        <UserMenu />
        <SessionExpirationPrompt />
        <Outlet />
        <Footer />
        {clickedCardIndex === refCardIndex && cardClicked && modalData && (
          <MovieDetailModal
            key={modalData.id}
            modalPosterPath={modalData.poster_path}
            movieTitle={modalData.name || modalData.title}
            overview={modalData.overview}
            tagline={modalData.tagline}
            videosInfoList={modalData.videos.results}
            year={modalData.release_date && modalData.release_date.slice(0, 4)}
            castData={modalData.credits.cast}
          />
        )}
      </div>
    </div>
  );
}

export default SharedLayout;
