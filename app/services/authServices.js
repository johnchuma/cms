import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../utils/firebase";

export const app = axios.create({
  baseURL: "http://localhost:5000",
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
