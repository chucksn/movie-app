import { useDispatch } from "react-redux";
import useLogout from "./useLogout";

const useWatchList = () => {
  const dispatch = useDispatch();
  const { logout } = useLogout();

  const getWatchlist = async (token) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URI}/api/v1/watchlist`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        dispatch({
          type: "SET_WATCHLIST",
          payload: data.watchlist,
        });
      }
      if (response.status === 401) {
        logout();
        dispatch({ type: "SHOW_SESSION_EXPIRATION_PROMPT" });
      }
      if (response.status === 400) {
        throw data.error;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { getWatchlist };
};

export default useWatchList;
