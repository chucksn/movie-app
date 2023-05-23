import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function SessionExpirationPrompt() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showSessionExpirationPrompt = useSelector(
    (state) => state.showSessionExpirationPrompt
  );
  const handleSignInClick = () => {
    navigate("/sign-in");
    dispatch({ type: "HIDE_SESSION_EXPIRATION_PROMPT" });
  };
  const handleCancelClick = () => {
    dispatch({ type: "HIDE_SESSION_EXPIRATION_PROMPT" });
  };
  return (
    <>
      {showSessionExpirationPrompt && (
        <div className="fixed w-full h-full left-0 top-0  z-50 flex justify-center items-center ">
          <div className="prompt-ctn  p-4 bg-slate-300 rounded-md w-[80%] md:w-1/2">
            <span className="prompt-txt block text-center font-medium">
              Session expired !!
            </span>
            <span className="block text-red-500 text-center">
              login to access watchlist
            </span>
            <div className="prompt-btn-ctn flex justify-center">
              <button
                onClick={handleSignInClick}
                className="bg-zinc-600 hover:bg-zinc-700 text-white px-6 py-1 rounded-lg my-4 mx-2 outline-none"
              >
                Login
              </button>
              <button
                onClick={handleCancelClick}
                className="bg-zinc-600 hover:bg-zinc-700 text-white px-6 py-1 rounded-lg my-4 mx-2 outline-none"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SessionExpirationPrompt;
