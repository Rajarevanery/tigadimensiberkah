export type ILogin = {
  email: string;
  password: string;
};

export type Role = "ADMIN" | "KARYAWAN" | null;

export type IUser = {
  id: string;
  email: string;
  nama: string;
  role: Role;
};

export type LoginResponse = {
  auth: boolean;
  user: IUser;
};
