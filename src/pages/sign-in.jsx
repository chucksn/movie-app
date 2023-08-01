import Login from "../components/login";
import SignUp from "../components/signUp";
import ResetPassword from "../components/resetPassword";
import { useState } from "react";

function SignIn() {
  const [showLogin, setShowLogin] = useState(true);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-slate-200">
      {showLogin && (
        <Login
          key="login"
          setShowLogin={setShowLogin}
          setShowSignUp={setShowSignUp}
          setShowResetPassword={setShowResetPassword}
        />
      )}
      {showSignUp && (
        <SignUp
          key="sign-up"
          setShowLogin={setShowLogin}
          setShowSignUp={setShowSignUp}
        />
      )}
      {showResetPassword && (
        <ResetPassword
          key="reset-password"
          setShowLogin={setShowLogin}
          setShowResetPassword={setShowResetPassword}
        />
      )}
    </div>
  );
}

export default SignIn;
