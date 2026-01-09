import { useNavigate } from "react-router";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <section className="grid place-items-center w-screen font-primary bg-primary-bg">
      <div className="max-w-4xl w-full mx-auto flex justify-center items-center flex-col gap-2 text-center">
        <h1 className="text-xl sm:text-4xl font-bold gap-2 flex flex-col items-center">
          <span className="text-primary-text">Waduh, tujuanmu nggak ada!</span>
        </h1>
        <p className="text-secondary-text">
          Click dibawah ini untuk menuju ke halaman utama.
        </p>

        <button
          onClick={() => navigate(-1)}
          className="bg-button-primary hover:brightness-75 transition mt-10 w-32 h-10 cursor-pointer text-lg rounded-lg text-primary-text text-white"
        >
          Kembali
        </button>
      </div>
    </section>
  );
};

export default ErrorPage;
