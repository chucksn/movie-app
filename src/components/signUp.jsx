import { useRef, useState } from "react";
import { RiErrorWarningFill } from "react-icons/ri";

function SignUp({ setShowLogin, setShowSignUp, setLoading }) {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const [nameErrorMsg, setNameErrorMsg] = useState("");
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [usernameErrorMsg, setUsernameErrorMsg] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");

  const baseUri = process.env.REACT_APP_BASE_URI;

  const handleCreateAccount = async () => {
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const name = nameRef.current.value;
    const email = emailRef.current.value;

    const requestBody = { name, email, username, password };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    };

    setLoading(true);
    setNameErrorMsg("");
    setEmailErrorMsg("");
    setUsernameErrorMsg("");
    setPasswordErrorMsg("");

    try {
      const response = await fetch(
        `${baseUri}/api/v1/user/auth/sign-up`,
        requestOptions
      );
      const data = await response.json();
      console.log(data);
      if (response.status === 201) {
        setShowLogin(true);
        setShowSignUp(false);
        setLoading(false);
      }

      if (response.status === 400) {
        setLoading(false);
        throw data.error;
      }
    } catch (error) {
      error.name && setNameErrorMsg(error.name);
      error.email && setEmailErrorMsg(error.email);
      error.username && setUsernameErrorMsg(error.username);
      error.password && setPasswordErrorMsg(error.password);
      console.error(error);
    }
  };

  const handleClose = () => {
    setShowLogin(true);
    setShowSignUp(false);
  };

  return (
    <div className="sign-up flex flex-col justify-center items-center w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%] min-h-64 px-12 py-8 bg-slate-300 rounded-lg relative mt-20 sm:mt-32 mb-8">
      <span
        className="close absolute text-black/70 right-0 top-0 text-3xl cursor-pointer m-4"
        onClick={handleClose}
      >
        &times;
      </span>

      <span className="block font-medium text-lg text-black/70">
        Create a user account
      </span>
      <span className="block my-4">
        Already have an account?{" "}
        <span onClick={handleClose} className="text-sky-600 cursor-pointer">
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
          onClick={handleCreateAccount}
          className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-1 rounded-lg mt-8 mb-4 outline-none"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}

export default SignUp;
