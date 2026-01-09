import { useAuthContext } from "../../context/auth-context";

const Dashboard = () => {
  const { nama } = useAuthContext();

  return <div>Dashboard, halo {nama}</div>;
};

export default Dashboard;
