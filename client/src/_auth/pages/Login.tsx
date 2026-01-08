import { useState } from "react";
import { useLogin } from "../../lib/mutations/mutations";
import type { ILogin } from "../../types/types";

const Login = () => {
  const { mutateAsync: loginUser } = useLogin();

  const [user, setUser] = useState<ILogin>({
    email: "",
    password: "",
  });

  return <div>Login</div>;
};

export default Login;
