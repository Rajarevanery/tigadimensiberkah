import { NavLink, useNavigate } from "react-router";
import { useState } from "react";
import { useAuthContext } from "../../context/auth-context";
import { useLogout } from "../../lib/mutations/mutations";
import { toast } from "react-toastify";

const NavigationBar = () => {
  const navigate = useNavigate();
  const { email, nama } = useAuthContext();
  const { mutateAsync: logoutUser } = useLogout();

  const [open, setOpen] = useState(false);

  const routeList = [
    { name: "Pelanggan", route: "pelanggan" },
    { name: "Dashboard", route: "dashboard" },
    { name: "Karyawan", route: "karyawan" },
    { name: "Wilayah", route: "wilayah" },
    { name: "Katalog", route: "katalog" },
  ];

  const initial = nama?.charAt(0).toUpperCase() ?? "?";

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("Logout Berhasil");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="flex items-center justify-between w-full">
      <div className="relative">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-md shadow-black/20 hover:bg-black/5 transition"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-black text-white font-semibold">
            {initial}
          </div>

          <div className="text-left">
            <p className="text-sm font-semibold">{nama}</p>
            <p className="text-xs text-gray-500">{email}</p>
          </div>
        </button>

        {open && (
          <div className="absolute left-0 mt-2 w-44 bg-white rounded-lg shadow-lg overflow-hidden z-50">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                navigate("/profile");
              }}
              className="w-full text-left px-4 py-3 hover:bg-black/5 transition"
            >
              Profile
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      <section>
        <ul className="flex flex-row gap-6 bg-white rounded-full shadow-md shadow-black/20">
          {routeList.map(({ name, route }) => (
            <NavLink
              key={route}
              to={route}
              className={({ isActive }) =>
                `
                py-4 px-8 rounded-full transition
                ${
                  isActive
                    ? "bg-black text-white"
                    : "text-black hover:bg-black/10"
                }
                `
              }
            >
              {name}
            </NavLink>
          ))}
        </ul>
      </section>
    </header>
  );
};

export default NavigationBar;
