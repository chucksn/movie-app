import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { MdError } from "react-icons/md";

function Login({ setShowSignUp, setShowLogin, setLoading, loading }) {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const baseUri = process.env.REACT_APP_BASE_URI;

  const handleClose = () => {
    navigate(-1);
  };

  const handleSignUp = () => {
    setShowSignUp(true);
    setShowLogin(false);
  };

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGGED_OUT" });
    dispatch({ type: "RESET_WATCHLIST" });
    dispatch({ type: "RESET_USER" });
    dispatch({ type: "RESET_USER_MENU_TOGGLE" });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const username = usernameRef.current.value;
      const password = passwordRef.current.value;

      const requestBody = { username, password };

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      };

      const response = await fetch(
        `${baseUri}/api/v1/user/auth/login`,
        requestOptions
      );
      const data = await response.json();

      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(data));
        dispatch({ type: "SET_USER", payload: data });
        dispatch({ type: "LOGGED_IN" });
        navigate(-1);
        setLoading(false);

        const getWatchlist = await fetch(`${baseUri}/api/v1/watchlist`, {
          headers: { Authorization: `Bearer ${data.token}` },
        });
        const response_data = await getWatchlist.json();
        if (getWatchlist.status === 200) {
          dispatch({
            type: "SET_WATCHLIST",
            payload: response_data.watchlist,
          });
        }
        if (response.status === 401) {
          logout();
          dispatch({ type: "SHOW_SESSION_EXPIRATION_PROMPT" });
        }
      }
      if (response.status === 400) {
        setLoading(false);
        throw data.error;
      }
    } catch (error) {
      setErrorMsg(error);
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-between items-center w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%] min-h-64 px-12 py-8 bg-slate-300 rounded-lg relative">
        <span
          className="close absolute text-black/70 right-0 top-0 text-3xl cursor-pointer m-4"
          onClick={handleClose}
        >
          &times;
        </span>
        <span className="block my-6">
          Don't have an account?{" "}
          <span onClick={handleSignUp} className="text-sky-600 cursor-pointer">
            Sign Up
          </span>
        </span>
        <form className="flex flex-col " onSubmit={handleLogin}>
          <label htmlFor="username">Username</label>
          <input
            ref={usernameRef}
            type="text"
            name="username"
            placeholder="Enter username"
            spellCheck={false}
            className={`p-2 rounded-lg mb-4 ${
              errorMsg && errorMsg === "Username required"
                ? "outline outline-2 outline-red-500"
                : " outline-none"
            }`}
            size={25}
          />
          <label htmlFor="password">Password</label>
          <input
            ref={passwordRef}
            type="password"
            name="password"
            placeholder="Enter Password"
            className={`p-2 rounded-lg mb-4 ${
              errorMsg && errorMsg === "Password required"
                ? "outline outline-2 outline-red-500"
                : " outline-none"
            }`}
            size={25}
          />
          <button
            type="submit"
            disabled={loading}
            // onClick={handleLogin}
            className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-1 rounded-lg my-4 outline-none"
          >
            Login
          </button>
        </form>
        {errorMsg && (
          <span className="block text-red-500">
            <MdError className="inline text-xl" /> {errorMsg}
          </span>
        )}
      </div>
    </>
  );
}

export default Login;
