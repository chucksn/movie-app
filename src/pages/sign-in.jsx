import Login from "../components/login";
import SignUp from "../components/signUp";
import { useState } from "react";

function SignIn() {
  const [showLogin, setShowLogin] = useState(true);
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-slate-200">
      {showLogin && (
        <Login setShowLogin={setShowLogin} setShowSignUp={setShowSignUp} />
      )}
      {showSignUp && (
        <SignUp setShowLogin={setShowLogin} setShowSignUp={setShowSignUp} />
      )}
    </div>
  );
}

export default SignIn;
