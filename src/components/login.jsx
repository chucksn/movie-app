import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import loadingSvg from "../images/loading2.svg";

function Login({ setShowSignUp, setShowLogin }) {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [invalidLogin, setInvalidLogin] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const host = process.env.REACT_APP_HOST;
  const port = process.env.REACT_APP_PORT;

  const handleClose = () => {
    navigate(-1);
  };

  const handleSignUp = () => {
    setShowSignUp(true);
    setShowLogin(false);
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const username = usernameRef.current.value;
      const password = passwordRef.current.value;

      const requestBody = { username, password };

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      };

      const postUser = await fetch(
        `http://${host}:${port}/api/v1/user/auth/login`,
        requestOptions
      );
      const postUser_response_data = await postUser.json();

      dispatch({ type: "SET_USER", payload: postUser_response_data });
      dispatch({ type: "LOGGED_IN" });
      navigate(-1);
      setLoading(false);

      console.log(postUser_response_data);

      const getWatchlist = await fetch(
        `http://${host}:${port}/api/v1/user/${postUser_response_data.id}/watchlist`
      );
      const response_data = await getWatchlist.json();
      dispatch({
        type: "SET_WATCHLIST",
        payload: response_data.watchlist,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading && (
        <img
          src={loadingSvg}
          alt="loading"
          className="animate-spin-slow"
          width={40}
          height={40}
        />
      )}
      {!loading && (
        <div className="flex flex-col justify-between items-center w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%] min-h-64 px-12 py-8 bg-slate-300 rounded-lg relative">
          <span
            className="close absolute text-black/70 right-0 top-0 text-3xl cursor-pointer m-4"
            onClick={handleClose}
          >
            &times;
          </span>
          <span className="block my-6">
            Don't have an account?{" "}
            <span
              onClick={handleSignUp}
              className="text-sky-600 cursor-pointer"
            >
              Sign Up
            </span>
          </span>
          <form className="flex flex-col ">
            <label htmlFor="username">Username</label>
            <input
              ref={usernameRef}
              type="text"
              name="username"
              placeholder="Enter username"
              spellCheck={false}
              className="p-2 rounded-lg outline-none mb-4"
              size={25}
            />
            <label htmlFor="password">Password</label>
            <input
              ref={passwordRef}
              type="password"
              name="password"
              placeholder="Enter Password"
              className="p-2 rounded-lg outline-none mb-4"
              size={25}
            />
            <button
              type="button"
              onClick={handleLogin}
              className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-1 rounded-lg my-4 outline-none"
            >
              Login
            </button>
          </form>
          {invalidLogin && (
            <span className="block text-red-500">{invalidLogin}</span>
          )}
        </div>
      )}
    </>
  );
}

export default Login;
