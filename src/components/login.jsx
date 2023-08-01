import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdError } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { BiLoaderAlt } from "react-icons/bi";
import useLogin from "../hooks/useLogin";
import { usePostLogin } from "../hooks/auth";
import useWatchList from "../hooks/useWatchlist";

function Login({ setShowSignUp, setShowLogin, setShowResetPassword }) {
  const [errorMsg, setErrorMsg] = useState("");
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const { login } = useLogin();

  const { getWatchlist } = useWatchList();

  const { mutate, data, isLoading } = usePostLogin();

  const handleClose = () => {
    navigate(-1);
  };

  const handleSignUp = () => {
    setShowSignUp(true);
    setShowLogin(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    mutate({ username, password });
  };

  useEffect(() => {
    if (data && data.error) {
      setErrorMsg(data.error);
    }

    if (data && !data.error) {
      login(data);
      navigate(-1);
      getWatchlist(data.token);
      setErrorMsg("");
    }
  }, [data]);

  const handleGoogleLogin = () => {};
  const handleForgotPassword = () => {
    setShowResetPassword(true);
    setShowLogin(false);
  };

  return (
    <>
      <div className="flex flex-col justify-between  w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%] min-h-64 px-12 py-8 bg-slate-300 rounded-lg relative mt-20 sm:mt-32 mb-8">
        <span
          className="close absolute text-black/70 right-0 top-0 text-3xl cursor-pointer m-4"
          onClick={handleClose}
        >
          &times;
        </span>

        <span className="block my-6 text-center">
          Don't have an account?{" "}
          <span
            onClick={handleSignUp}
            className="text-sky-600 cursor-pointer font-medium"
          >
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
          <span
            onClick={handleForgotPassword}
            className="text-sky-600 cursor-pointer font-medium text-right"
          >
            Forgot Password?
          </span>
          <button
            type="submit"
            disabled={isLoading}
            className={`lg:hover:bg-sky-700 text-white px-6 py-2 text-sm sm:text-base rounded-lg my-4 outline-none font-medium ${
              isLoading ? "bg-sky-600/60" : "bg-sky-600"
            }`}
          >
            Login with Username{" "}
            {isLoading && (
              <BiLoaderAlt className="inline-block text-white  sm:text-xl animate-spin-slow" />
            )}
          </button>
        </form>

        {errorMsg && (
          <span className="block text-red-500 font-medium text-center">
            <MdError className="inline text-xl" /> {errorMsg}
          </span>
        )}

        <div className="relative my-3">
          <hr className="absolute w-[42%] border-neutral-400 top-1/2 left-0" />
          <span className="block text-center text-neutral-600 text-sm sm:text-base font-medium">
            OR
          </span>
          <hr className="absolute w-[42%] border-neutral-400 top-1/2 right-0" />
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={""}
          className="border border-sky-600 bg-slate-100 font-medium text-sm sm:text-base text-neutral-700 hover:bg-white px-4 py-1 sm:px-6 rounded-lg my-4 outline-none"
        >
          <FcGoogle className="inline-block text-3xl" />
          &nbsp; Continue with Google
        </button>
      </div>
    </>
  );
}

export default Login;
