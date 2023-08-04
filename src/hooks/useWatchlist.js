import { useDispatch } from "react-redux";
import useLogout from "./useLogout";
import {
  fetchWatchlistData,
  updateWatchlistData,
  deleteWatchlistData,
} from "../api/watchListApi";
import { getMovieById } from "../api/movieDataApi";

const useWatchList = () => {
  const dispatch = useDispatch();
  const { logout } = useLogout();

  const getWatchlist = async (token) => {
    try {
      const { status, data, error } = await fetchWatchlistData(token);
      if (status === 200) {
        dispatch({
          type: "SET_WATCHLIST",
          payload: data.watchlist,
        });
      }
      if (status === 401) {
        logout();
        dispatch({ type: "SHOW_SESSION_EXPIRATION_PROMPT" });
      }
      if (status === 400) {
        throw data.error;
      }
      if (error) throw error;
    } catch (error) {
      console.error(error);
    }
  };

  const updateWatchlist = async ({ tag, token, id }) => {
    try {
      const watchlistItem = await getMovieById({ id, tag });
      const { status, data, error } = await updateWatchlistData({
        tag,
        watchlistItem,
        token,
      });
      if (status === 401) {
        logout();
        dispatch({ type: "SHOW_SESSION_EXPIRATION_PROMPT" });
      }
      if (status === 400) {
        throw data.error;
      }
      if (error) throw error;
    } catch (error) {
      console.error(error);
    }
  };

  const deleteWatchlist = async ({ watchlistItemId, token }) => {
    try {
      const { status, data, error } = await deleteWatchlistData({
        watchlistItemId,
        token,
      });
      if (status === 401) {
        logout();
        dispatch({ type: "SHOW_SESSION_EXPIRATION_PROMPT" });
      }
      if (status === 400) {
        throw data.error;
      }
      if (error) throw error;
    } catch (error) {
      console.error(error);
    }
  };

  return { getWatchlist, updateWatchlist, deleteWatchlist };
};

export default useWatchList;
