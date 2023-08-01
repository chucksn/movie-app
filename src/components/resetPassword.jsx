import { BiLoaderAlt } from "react-icons/bi";
import { useRef } from "react";

function ResetPassword({ setShowLogin, setShowResetPassword }) {
  const emailRef = useRef();

  const handleClose = () => {
    setShowResetPassword(false);
    setShowLogin(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const isLoading = "";

  return (
    <>
      <div className="flex flex-col justify-between  w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%] min-h-64 px-12 py-8 bg-slate-300 rounded-lg relative mt-20 sm:mt-32 mb-8">
        <span
          className="close absolute text-black/70 right-0 top-0 text-3xl cursor-pointer m-4"
          onClick={handleClose}
        >
          &times;
        </span>

        <form className="flex flex-col " onSubmit={handleSubmit}>
          <span className="block font-medium mb-2 text-center text-zinc-800">
            Email Address
          </span>
          <input
            ref={emailRef}
            type="text"
            name="email"
            placeholder="Enter Email Address"
            spellCheck={false}
            className={`p-2 rounded-lg mb-4 `}
            size={25}
          />

          <button
            type="submit"
            disabled={isLoading}
            className={`lg:hover:bg-sky-700 text-white px-6 py-2 text-sm sm:text-base rounded-lg my-4 outline-none font-medium ${
              isLoading ? "bg-sky-600/60" : "bg-sky-600"
            }`}
          >
            Reset Password{" "}
            {isLoading && (
              <BiLoaderAlt className="inline-block text-white  sm:text-xl animate-spin-slow" />
            )}
          </button>
        </form>
      </div>
    </>
  );
}

export default ResetPassword;
