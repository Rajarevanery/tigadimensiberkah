export type ILogin = {
  email: string;
  password: string;
};

export type Role = "ADMIN" | "KARYAWAN";

export type IUser = {
  id: string;
  email: string;
  nama: string;
  role: Role;
};
