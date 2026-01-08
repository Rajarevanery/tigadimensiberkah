import React, { useState } from "react";
import { useLogin } from "../../lib/mutations/mutations";
import type { ILogin } from "../../types/types";
import { toast } from "react-toastify";

const Login = () => {
  const { mutateAsync: loginUser } = useLogin();

  const [user, setUser] = useState<ILogin>({
    email: "",
    password: "",
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

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

      if (response.nama) {
        return toast.success(`Login Berhasil, selamat datang ${response.nama}`);
      }
    } catch (error) {
      toast.error("Login gagal");
      console.error(error);
    }
  };

  return (
    <section className="flex flex-1 min-h-screen flex-row">
      <img src="" alt="" />
      <div className="flex flex-col justify-around">
        <div>
          <h1>Selamat Datang</h1>
          <p>Masuk dengan akunmu untuk mengakses aplikasi</p>
        </div>

        <form onSubmit={handleSubmit}>
          <fieldset>
            <div>
              <label htmlFor="email">Email</label>
              <input name="email" type="email" onChange={handleInput} />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input name="password" type="password" onChange={handleInput} />
            </div>
          </fieldset>

          <button className="bg-button-primary">Masuk</button>
        </form>
      </div>
    </section>
  );
};

export default Login;
