import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setShowSignUp, setShowLogin }) {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [invalidLogin, setInvalidLogin] = useState("");
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
  };

  const handleSignUp = () => {
    setShowSignUp(true);
    setShowLogin(false);
  };

  const handleLogin = () => {};

  return (
    <>
      {
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
              size={30}
            />
            <label htmlFor="password">Password</label>
            <input
              ref={passwordRef}
              type="password"
              name="password"
              placeholder="Enter Password"
              className="p-2 rounded-lg outline-none mb-4"
              size={30}
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
      }
    </>
  );
}

export default Login;
