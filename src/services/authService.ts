import api from "./api";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export const loginUser = (data: LoginData) => {
  return api.post("/auth/login", data);
};

export const registerUser = (data: RegisterData) => {
  return api.post("/auth/register", data);
};

export const logoutUser = () => {
  return api.post("/auth/logout");
};

export const getCurrentUser = () => {
  return api.get("/auth/me");
};