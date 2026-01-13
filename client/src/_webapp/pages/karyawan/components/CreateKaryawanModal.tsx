import type React from "react";

const CreateKaryawanModal = ({
  setOpenCreateModal,
}: {
  setOpenCreateModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="bg-black/50 backdrop-blur-sm w-screen h-screen flex justify-center items-center absolute top-0 left-0 p-4">
      <div className="bg-white rounded-lg p-7 w-full max-w-lg">
        <div className="flex flex-row justify-between items-center gap-10">
          <span className="text-2xl font-semibold">Create user</span>
          {/* <i
            onClick={() => setOpenCreateModal(false)}
            className="p-2 bg-red-500/30 rounded-full"
          >
            <IoClose size={25} />
          </i> */}
        </div>

        <hr className="my-6 opacity-20" />

        <form className="">
          <fieldset className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="" className="font-semibold">
                Email
              </label>
              <input
                type="email"
                placeholder="budi@example.com"
                className="border border-black/20 p-2 rounded-lg outline-none w-full"
              />
            </div>
            <div className="flex flex-col xl:flex-row gap-2">
              <div className="flex flex-col w-full">
                <label htmlFor="" className="font-semibold">
                  Password
                </label>
                <input
                  type="password"
                  className="border border-black/20 p-2 rounded-lg outline-none"
                />
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="" className="font-semibold">
                  Current Password
                </label>
                <input
                  type="password"
                  className="border border-black/20 p-2 rounded-lg outline-none w-full"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="font-semibold">
                Role
              </label>
              <select
                name=""
                id=""
                className="border border-black/20 p-2 rounded-lg "
              >
                <option>Karyawan</option>
                <option disabled className="">
                  Admin
                </option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="font-semibold">
                <span>Wilayah</span>
                <span className="text-sm opacity-50">
                  {" "}
                  - Optional (ini bisa diganti nanti)
                </span>
              </label>
              <select
                name=""
                id=""
                className="border border-black/20 p-2 rounded-lg "
              >
                <option></option>
                <option>Kemang</option>
                <option className="">Titan Arum</option>
              </select>
            </div>
          </fieldset>

          <div className="flex flex-row gap-4 justify-end mt-4 items-center">
            <button onClick={() => setOpenCreateModal(false)} className="border border-black/20 p-2 px-4 rounded-full cursor-pointer">
              Cancel
            </button>
            <button className="bg-black text-white p-2 px-4 rounded-full cursor-pointer">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateKaryawanModal;
