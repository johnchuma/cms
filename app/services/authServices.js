import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../utils/firebase";
import { getAccessToken } from "../utils/localStorageData";

export const app = axios.create({
  baseURL: "https://hemani.io",
});

export const register = async (data) => {
  return await app.post("/users", data);
};

export const login = async (data) => {
  return await app.post("/users/login", data);
};

export const loginWithGoogle = async (data) => {
  const provider = new GoogleAuthProvider();
  const response = await signInWithPopup(auth, provider);
  return await app.post("/users/login-with-google", {
    email: response.user.email,
    name: response.user.displayName,
    phone: response.user.phoneNumber,
  });
};

export const getVerificationCode = async (data) => {
  return await app.post("/users/send-recovery-code", data);
};
export const resetPassword = async (email, data) => {
  return await app.post(`/users/reset-password/${email}`, data);
};

export const getMyInfo = async () => {
  return await app.get(`/users/me`, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};

export const editUser = async (uuid, data) => {
  return await app.patch(`/users/${uuid}`, data, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};
