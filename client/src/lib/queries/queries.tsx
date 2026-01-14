import { useQuery } from "@tanstack/react-query";
import { getAllUser, getUser } from "../../api/AuthApi";
import { getAllWilayah } from "../../api/WilayahApi";

export const useGetUser = () => {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: async () => await getUser(),
    retry: false,
    staleTime: 0,
  });
};

export const useGetAllUser = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => await getAllUser(),
    staleTime: 5000 * 60,
  });
};

export const useGetAllWilayah = () => {
  return useQuery({
    queryKey: ["wilayah"],
    queryFn: async () => await getAllWilayah(),
    staleTime: 5000 * 60,
  });
};
