import api from "../lib/axios/api";

export const getAllWilayah = async () => {
  try {
    const res = await api.get("/wilayah");
    return res.data.wilayah;
  } catch (error) {
    console.log(error);
  }
};
