import { Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import Home from "./_global/Home";
import ErrorPage from "./_global/ErrorPage";
import Forbidden from "./_global/Forbidden";
import Loading from "./_global/Loading";

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
        <Route index element={<Home />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="403" element={<Forbidden />} />
        <Route path="loading" element={<Loading />} />
      </Routes>
    </main>
  );
}

export default App;
