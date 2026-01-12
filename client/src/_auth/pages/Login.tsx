import React, { useState } from "react";
import { useLogin } from "../../lib/mutations/mutations";
import type { ILogin } from "../../types/types";
import { toast } from "react-toastify";
import { MdOutlineEmail } from "react-icons/md";
import { TbEye, TbEyeOff, TbLockPassword } from "react-icons/tb";
import { ImSpinner8 } from "react-icons/im";
import { Navigate } from "react-router";
import { useAuthContext } from "../../context/auth-context";
import Loading from "../../_global/Loading";

const Login = () => {
  const { mutateAsync: loginUser, isPending } = useLogin();
  const { isAuthenticated } = useAuthContext();

  const [user, setUser] = useState<ILogin>({
    email: "",
    password: "",
  });

  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  if (isPending) return <Loading />;

  if (isAuthenticated) {
    return <Navigate to="/webapp/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isFormEmpty = Object.values(user).some(
      (value) => value === "" || value.length <= 0
    );

    if (isFormEmpty) {
      return toast.error("Tolong isi semua input");
    }

    try {
      const response = await loginUser(user);

      if (response.auth) {
        toast.success(`Login Berhasil, selamat datang ${response.user.nama}`);
      }
    } catch (error) {
      toast.error("Login gagal");
      console.error(error);
    }
  };

  return (
    <section className="flex flex-1 min-h-screen flex-row">
      <div className="flex-1 lg:block hidden">
        <img
          src="./login__bg.jpg"
          className="object-center object-cover flex-1 w-full h-full"
          alt=""
        />
      </div>
      <div className="flex flex-col justify-center flex-2 items-center w-50 bg-neutral-100">
        <div className="text-center">
          <h1 className="text-6xl font-semibold">Selamat Datang</h1>
          <p className="opacity-50 mt-2">
            Masuk dengan akunmu untuk mengakses seluruh fitur aplikasi
          </p>
        </div>

        <form
          action="submit"
          onSubmit={handleSubmit}
          className="mt-20 w-full max-w-xl p-4"
        >
          <fieldset className="flex flex-col gap-10">
            <div>
              <label htmlFor="email">Email</label>
              <div className="flex flex-row gap-2 border-4 border-gray-200 rounded-lg p-4 items-center">
                <i>
                  <MdOutlineEmail size={25} />
                </i>
                <input
                  name="email"
                  type="email"
                  placeholder="Masukkan email"
                  className="border-0 outline-0 w-full min-w-0"
                  onChange={handleInput}
                />
              </div>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <div className="flex flex-row gap-2 border-4 border-gray-200 rounded-lg p-4 items-center">
                <i>
                  <TbLockPassword size={25} />
                </i>
                <input
                  name="password"
                  type={isShowPassword ? "text" : "password"}
                  placeholder="Masukkan password"
                  className="border-0 outline-0 w-full"
                  onChange={handleInput}
                />
                <i
                  onClick={() => setIsShowPassword((prevState) => !prevState)}
                  className="hover:brightness-80 transition cursor-pointer"
                >
                  {isShowPassword ? (
                    <TbEye size={25} />
                  ) : (
                    <TbEyeOff size={25} />
                  )}
                </i>
              </div>
            </div>
          </fieldset>

          <button className="bg-button-primary hover:brightness-80 transition cursor-pointer text-white p-6 w-full mt-10 rounded-lg font-semibold flex justify-center items-center">
            {isPending ? (
              <i className="">
                <ImSpinner8 size={30} className="animate-spin" />
              </i>
            ) : (
              "Masuk"
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
