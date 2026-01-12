import { Navigate, Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import ErrorPage from "./_global/ErrorPage";
import Loading from "./_global/Loading";
import Login from "./_auth/pages/Login";
import WebAppLayout from "./_webapp/layout/WebAppLayout";
import Dashboard from "./_webapp/pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleProtectedRoute from "./components/RoleProtectedRoute";
import AllKaryawan from "./_webapp/pages/karyawan/AllKaryawan";

function App() {
  return (
    <main className="flex min-h-screen">
      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <Routes>
        {/* Default Rerouting  */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Error / Global Page */}
        <Route path="*" element={<ErrorPage />} />
        <Route path="loading" element={<Loading />} />

        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/webapp" element={<WebAppLayout />}>
            <Route path="dashboard" element={<Dashboard />} />

            <Route element={<RoleProtectedRoute allowedRoles={["ADMIN"]} />}>
              <Route path="karyawan" element={<AllKaryawan />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </main>
  );
}

export default App;
