import { useMutation } from "@tanstack/react-query";
import { postLogin, postSignUp } from "../api/authApi";

export const usePostLogin = () => {
  return useMutation({ mutationFn: postLogin });
};

export const usePostSignUp = () => {
  return useMutation({ mutationFn: postSignUp });
};
