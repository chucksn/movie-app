import { useRef } from "react";
import { useDispatch } from "react-redux";
import { RiErrorWarningFill } from "react-icons/ri";

function SignUp({ setShowLogin, setShowSignUp }) {
  const dispatch = useDispatch();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();

  const host = process.env.REACT_APP_HOST;
  const port = process.env.REACT_APP_PORT;

  const handleCreateAccount = () => {
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

    fetch(`http://${host}:${port}/api/v1/user/auth/sign-up`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 201) {
          setShowLogin(true);
          setShowSignUp(false);
        }
        console.log(data);
      })
      .catch((error) => console.error(error));
  };

  const handleClose = () => {
    setShowLogin(true);
    setShowSignUp(false);
  };

  return (
    <div className="sign-up flex flex-col justify-center items-center w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%] min-h-64 px-12 py-8 bg-slate-300 rounded-lg relative mt-16">
      <span
        className="close absolute text-black/70 right-0 top-0 text-3xl cursor-pointer m-4"
        onClick={handleClose}
      >
        &times;
      </span>
      <span className="block my-6 font-medium text-lg text-black/60">
        Create a user account
      </span>
      <form className="flex flex-col ">
        <label htmlFor="name">Name</label>
        <input
          ref={nameRef}
          type="text"
          name="name"
          placeholder="Enter Name"
          spellCheck={false}
          className="p-2 rounded-lg outline-none"
          size={25}
        />
        {/* <label
          htmlFor="name"
          className=" text-red-500 text-[0.92rem] text-center "
        >
          <RiErrorWarningFill className="inline" /> Name is required
        </label> */}

        <label htmlFor="email" className="mt-3">
          Email
        </label>
        <input
          ref={emailRef}
          type="text"
          name="email"
          placeholder="Enter Email"
          spellCheck={false}
          className="p-2 rounded-lg outline-none"
          size={25}
        />
        {/* <label
          htmlFor="name"
          className=" text-red-500 text-[0.92rem] text-center "
        >
          <RiErrorWarningFill className="inline" /> email is required
        </label> */}

        <label htmlFor="username" className="mt-3">
          Username
        </label>
        <input
          ref={usernameRef}
          type="text"
          name="username"
          placeholder="Enter Username"
          spellCheck={false}
          className="p-2 rounded-lg outline-none"
          size={25}
        />
        {/* <label
          htmlFor="username"
          className=" text-red-500 text-[0.92rem] text-center "
        >
          <RiErrorWarningFill className="inline" /> username required
        </label> */}

        <label htmlFor="password" className="mt-3">
          Password
        </label>
        <input
          ref={passwordRef}
          type="password"
          name="password"
          placeholder="Enter Password"
          className="p-2 rounded-lg outline-none"
          size={25}
        />
        {/* <label
          htmlFor="password"
          className=" text-red-500 text-[0.92rem] text-center "
        >
          <RiErrorWarningFill className="inline" /> password required
        </label> */}

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
