import axios from "axios";
import api from "../lib/axios/api";
import type { ILogin, IUser, LoginResponse } from "../types/types";

export const loginUser = async (data: ILogin): Promise<LoginResponse> => {
  try {
    const res = await api.post("/auth/login", data);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
    } else {
      console.error("Unknown error:", error);
    }
    throw error;
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    await api.post("/auth/logout");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Logout failed:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
    } else {
      console.error("Unknown logout error:", error);
    }
    throw error;
  }
};

// export const getUser = async (): Promise<IUser | null> => {
//   try {
//     const res = await api.get("/auth/me");
//     return res.data.user;
//   } catch (err) {
//     if (axios.isAxiosError(err)) {
//       if (err.response?.status === 401) {
//         return null;
//       }
//     }
//     throw err;
//   }
// };
export const getUser = async (): Promise<IUser | null> => {
  const res = await api.get("/auth/me");
  return res.data.user;
};
