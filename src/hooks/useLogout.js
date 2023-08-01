import { useDispatch } from "react-redux";

const useLogout = () => {
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGGED_OUT" });
    dispatch({ type: "RESET_WATCHLIST" });
    dispatch({ type: "RESET_USER" });
    dispatch({ type: "RESET_USER_MENU_TOGGLE" });
  };
  return { logout };
};

export default useLogout;
