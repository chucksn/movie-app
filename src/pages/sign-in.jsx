import Login from "../components/login";
import SignUp from "../components/signUp";
import { useState } from "react";
import loadingSvg from "../images/loading2.svg";

function SignIn() {
  const [showLogin, setShowLogin] = useState(true);
  const [showSignUp, setShowSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-slate-200 relative">
      {showLogin && (
        <Login
          setShowLogin={setShowLogin}
          setShowSignUp={setShowSignUp}
          setLoading={setLoading}
        />
      )}
      {showSignUp && (
        <SignUp
          setShowLogin={setShowLogin}
          setShowSignUp={setShowSignUp}
          setLoading={setLoading}
        />
      )}
      {loading && (
        <div className="w-full h-full flex justify-center items-center absolute top-0 left-0 ">
          <img
            src={loadingSvg}
            alt="loading"
            className="animate-spin-slow "
            width={40}
            height={40}
          />
        </div>
      )}
    </div>
  );
}

export default SignIn;
