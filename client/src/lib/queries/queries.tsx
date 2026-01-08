import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../api/AuthApi";

export const useGetUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => await getUser(),
  });
};
