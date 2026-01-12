import { Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import ErrorPage from "./_global/ErrorPage";
import Loading from "./_global/Loading";
import Login from "./_auth/pages/Login";
import WebAppLayout from "./_webapp/layout/WebAppLayout";
import Dashboard from "./_webapp/pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <main className="flex min-h-screen">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="loading" element={<Loading />} />

        <Route path="/" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/webapp" element={<WebAppLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </main>
  );
}

export default App;
