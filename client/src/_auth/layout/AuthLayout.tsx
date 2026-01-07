import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="flex flex-1 min-h-screen justify-center items-center relative">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
