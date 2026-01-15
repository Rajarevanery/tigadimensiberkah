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

export type IWilayah = {
  nama_wilayah: string;
};

export type IUserWilayah = {
  wilayah: IWilayah;
};

export type IUserWithWilayah = IUser & {
  createdAt: string;
  wilayah: IUserWilayah[];
};

export type CreateUserPayload = {
  nama: string;
  email: string;
  password: string;
  currentPassword: string;
  role: string;
  wilayahId?: string[];
};
