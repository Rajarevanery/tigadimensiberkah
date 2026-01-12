import { useGetUser } from "../lib/queries/queries";

export const useAuth = () => {
  const { data, isPending, isError } = useGetUser();

  console.log(data)

  return {
    id: data?.id ?? "",
    email: data?.email ?? "",
    nama: data?.nama ?? "",
    role: data?.role ?? null,
    isAuthenticated: !!data && !isError,
    isPending,
  };
};
