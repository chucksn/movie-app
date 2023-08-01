import { useDispatch } from "react-redux";

const useLogin = () => {
  const dispatch = useDispatch();

  const login = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    dispatch({ type: "SET_USER", payload: data });
    dispatch({ type: "LOGGED_IN" });
  };
  return { login };
};

export default useLogin;
