import { Outlet } from "react-router";
import NavigationBar from "../components/NavigationBar";

const WebAppLayout = () => {
  return (
    <section className="flex flex-1 flex-col min-h-screen p-6">
      <NavigationBar />
      <div className="flex flex-1">
        <Outlet />
      </div>
    </section>
  );
};

export default WebAppLayout;
