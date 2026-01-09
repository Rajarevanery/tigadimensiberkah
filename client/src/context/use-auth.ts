import { useGetUser } from "../lib/queries/queries";

export const useAuth = () => {
  const { data, isPending } = useGetUser();

  return {
    id: data?.id ?? "",
    email: data?.email ?? "",
    nama: data?.nama ?? "",
    role: data?.role ?? "KARYAWAN",
    isAuthenticated: Boolean(data?.id),
    isPending,
  };
};
