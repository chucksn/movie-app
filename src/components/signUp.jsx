import { useRef, useState } from "react";
import { RiErrorWarningFill } from "react-icons/ri";
import { BiLoaderAlt } from "react-icons/bi";
import { usePostSignUp } from "../hooks/auth";

function SignUp({ setShowLogin, setShowSignUp }) {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const [nameErrorMsg, setNameErrorMsg] = useState("");
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [usernameErrorMsg, setUsernameErrorMsg] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");

  const { mutate, isLoading } = usePostSignUp({
    setShowLogin,
    setShowSignUp,
    setNameErrorMsg,
    setEmailErrorMsg,
    setUsernameErrorMsg,
    setPasswordErrorMsg,
  });

  const handleCreateAccount = async () => {
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const name = nameRef.current.value;
    const email = emailRef.current.value;

    mutate({ username, password, name, email });
  };

  const handleClose = () => {
    setShowLogin(true);
    setShowSignUp(false);
  };

  return (
    <div className="sign-up flex flex-col justify-center  w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%] min-h-64 px-12 py-8 bg-slate-300 rounded-lg relative mt-20 sm:mt-32 mb-8">
      <span
        className="close absolute text-black/70 right-0 top-0 text-3xl cursor-pointer m-4"
        onClick={handleClose}
      >
        &times;
      </span>

      <span className="block font-medium text-lg text-black/70 text-center">
        Create a user account
      </span>
      <span className="block my-4 text-center">
        Already have an account?{" "}
        <span
          onClick={handleClose}
          className="text-sky-600 cursor-pointer font-medium"
        >
          Login
        </span>
      </span>
      <form className="flex flex-col ">
        <label htmlFor="name">Name</label>
        <input
          ref={nameRef}
          type="text"
          name="name"
          placeholder="Enter Name"
          spellCheck={false}
          className={`p-2 rounded-lg mb-4 ${
            nameErrorMsg ? "outline outline-2 outline-red-500" : " outline-none"
          }`}
          size={25}
        />
        <label
          htmlFor="name"
          className=" text-red-500 text-[0.92rem] text-center "
        >
          {nameErrorMsg && (
            <>
              <RiErrorWarningFill className="inline" /> {nameErrorMsg}
            </>
          )}
        </label>

        <label htmlFor="email" className="mt-3">
          Email
        </label>
        <input
          ref={emailRef}
          type="text"
          name="email"
          placeholder="Enter Email"
          spellCheck={false}
          className={`p-2 rounded-lg mb-4 ${
            emailErrorMsg
              ? "outline outline-2 outline-red-500"
              : " outline-none"
          }`}
          size={25}
        />
        <label
          htmlFor="name"
          className=" text-red-500 text-[0.92rem] text-center "
        >
          {emailErrorMsg && (
            <>
              <RiErrorWarningFill className="inline" /> {emailErrorMsg}
            </>
          )}
        </label>

        <label htmlFor="username" className="mt-3">
          Username
        </label>
        <input
          ref={usernameRef}
          type="text"
          name="username"
          placeholder="Enter Username"
          spellCheck={false}
          className={`p-2 rounded-lg mb-4 ${
            usernameErrorMsg
              ? "outline outline-2 outline-red-500"
              : " outline-none"
          }`}
          size={25}
        />
        <label
          htmlFor="username"
          className=" text-red-500 text-[0.92rem] text-center "
        >
          {usernameErrorMsg && (
            <>
              <RiErrorWarningFill className="inline" /> {usernameErrorMsg}
            </>
          )}
        </label>

        <label htmlFor="password" className="mt-3">
          Password
        </label>
        <input
          ref={passwordRef}
          type="password"
          name="password"
          placeholder="Enter Password"
          className={`p-2 rounded-lg mb-4 ${
            passwordErrorMsg
              ? "outline outline-2 outline-red-500"
              : " outline-none"
          }`}
          size={25}
        />
        <label
          htmlFor="password"
          className=" text-red-500 text-[0.92rem] text-center "
        >
          {passwordErrorMsg && (
            <>
              <RiErrorWarningFill className="inline" /> {passwordErrorMsg}
            </>
          )}
        </label>

        <button
          type="button"
          disabled={isLoading}
          onClick={handleCreateAccount}
          className={`lg:hover:bg-sky-700 text-white px-6 py-2 font-medium text-sm sm:text-base rounded-lg mt-8 mb-4 outline-none ${
            isLoading ? "bg-sky-600/60" : "bg-sky-600"
          }`}
        >
          Create Account{" "}
          {isLoading && (
            <BiLoaderAlt className="inline-block text-white  sm:text-xl animate-spin-slow" />
          )}
        </button>
      </form>
    </div>
  );
}

export default SignUp;
