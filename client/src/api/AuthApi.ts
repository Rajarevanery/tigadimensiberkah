import axios from "axios";
import api from "../lib/axios/api";
import type { ILogin, IUser } from "../types/types";

export const loginUser = async (data: ILogin): Promise<IUser> => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const getUser = async (): Promise<IUser | null> => {
  try {
    const res = await api.get("/auth/me");
    return res.data.user;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 401) {
        return null;
      }
    }
    throw err;
  }
};
