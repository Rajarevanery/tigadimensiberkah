import { NavLink } from "react-router";

const NavigationBar = () => {
  const routeList = [
    { name: "Pelanggan", route: "pelanggan" },
    { name: "Dashboard", route: "dashboard" },
    { name: "Karyawan", route: "karyawan" },
    { name: "Wilayah", route: "wilayah" },
    { name: "Katalog", route: "katalog" },
  ];

  return (
    <section className="w-fit ml-auto">
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
  );
};

export default NavigationBar;
