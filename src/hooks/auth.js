import { useMutation } from "@tanstack/react-query";
import { postLogin, postSignUp, deleteUser } from "../api/authApi";
import useWatchList from "./useWatchlist";
import useLogin from "./useLogin";
import useLogout from "./useLogout";
import { useNavigate } from "react-router-dom";

export const usePostLogin = ({ setErrorMsg }) => {
  const { login } = useLogin();
  const { getWatchlist } = useWatchList();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: postLogin,
    onError: (error) => {
      setErrorMsg(error);
    },
    onSuccess: (data) => {
      login(data);
      navigate(-1);
      getWatchlist(data.token);
      setErrorMsg("");
    },
  });
};

export const usePostSignUp = ({
  setShowLogin,
  setShowSignUp,
  setEmailErrorMsg,
  setNameErrorMsg,
  setUsernameErrorMsg,
  setPasswordErrorMsg,
}) => {
  return useMutation({
    mutationFn: postSignUp,
    onError: (error) => {
      setNameErrorMsg(error.name);
      setEmailErrorMsg(error.email);
      setUsernameErrorMsg(error.username);
      setPasswordErrorMsg(error.password);
    },
    onSuccess: (data) => {
      setShowLogin(true);
      setShowSignUp(false);
      setNameErrorMsg("");
      setEmailErrorMsg("");
      setUsernameErrorMsg("");
      setPasswordErrorMsg("");
    },
  });
};

export const useDeleteUser = ({ token, setShowDeletePrompt }) => {
  const { logout } = useLogout();
  return useMutation({
    mutationFn: () => deleteUser(token),
    onError: (error) => {
      console.error(error);
    },
    onSuccess: (data) => {
      logout();
      setShowDeletePrompt(false);
    },
  });
};
