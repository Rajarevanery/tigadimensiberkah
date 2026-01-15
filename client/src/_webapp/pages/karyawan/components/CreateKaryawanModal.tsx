import type React from "react";
import { useGetAllWilayah } from "../../../../lib/queries/queries";
import { IoChevronDownOutline } from "react-icons/io5";
import { useState } from "react";
import { toast } from "react-toastify";
import { useCreateUser } from "../../../../lib/mutations/mutations";

const CreateKaryawanModal = ({
  setOpenCreateModal,
}: {
  setOpenCreateModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { data: semuaWilayah, isPending } = useGetAllWilayah();
  const { mutateAsync: createUser } = useCreateUser();

  const [openWilayahDropdown, setOpenWilayahDropdown] =
    useState<boolean>(false);

  const [userData, setUserData] = useState({
    email: "",
    nama: "",
    password: "",
    currentPassword: "",
    role: "KARYAWAN",
    wilayahId: [] as string[],
  });

  const handleWilayahChange = (id: string, checked: boolean) => {
    setUserData((prev) => ({
      ...prev,
      wilayahId: checked
        ? [...prev.wilayahId, id]
        : prev.wilayahId.filter((w) => w !== id),
    }));
  };

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // ! tihs code sucks ass
    // let missingValues = [];

    // for (const [key, value] of Object.entries(userData)) {
    //   if (value === "") {
    //     missingValues = [...missingValues, key];
    //   }
    // }

    // if (missingValues.length > 0) {
    //   return toast.error(`Field ${missingValues.toString()} is empty`);
    // }

    const requiredFields = [
      "email",
      "nama",
      "password",
      "currentPassword",
    ] as const;

    const missingValues = requiredFields.filter((field) => {
      return userData[field].trim() === "";
    });

    if (missingValues.length > 0) {
      return toast.error(`Field ${missingValues.join(", ")} is empty`);
    }

    try {
      await createUser(userData);
      toast.success("User berhasil dibuat");
      setOpenCreateModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (isPending) return null;

  return (
    <div className="bg-black/50 backdrop-blur-sm w-screen h-screen flex justify-center items-center absolute top-0 left-0 p-4">
      <div className="bg-white rounded-lg p-7 w-full max-w-lg">
        <div className="flex flex-row justify-between items-center gap-10">
          <span className="text-2xl font-semibold">Create user</span>
        </div>

        <hr className="my-6 opacity-20" />

        <form onSubmit={handleSubmit} className="">
          <fieldset className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="email" className="font-semibold">
                Email
              </label>
              <input
                type="email"
                placeholder="budi@example.com"
                name="email"
                value={userData.email}
                onChange={handleInput}
                className="border border-black/20 p-2 rounded-lg outline-none w-full"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="nama" className="font-semibold">
                Nama Karyawan
              </label>
              <input
                type="text"
                placeholder="Budi Firmansyah"
                name="nama"
                value={userData.nama}
                onChange={handleInput}
                className="border border-black/20 p-2 rounded-lg outline-none w-full"
              />
            </div>
            <div className="flex flex-col xl:flex-row gap-2">
              <div className="flex flex-col w-full">
                <label htmlFor="password" className="font-semibold">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={userData.password}
                  onChange={handleInput}
                  className="border border-black/20 p-2 rounded-lg outline-none"
                />
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="currentPassword" className="font-semibold">
                  Current Password
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  onChange={handleInput}
                  value={userData.currentPassword}
                  className="border border-black/20 p-2 rounded-lg outline-none w-full"
                />
              </div>
            </div>

            <div
              onMouseLeave={() => setOpenWilayahDropdown(false)}
              className="flex flex-col"
            >
              <label htmlFor="wilayah" className="font-semibold">
                <span>Wilayah</span>
                <span className="text-sm opacity-50">
                  {" "}
                  - Optional (ini bisa diganti nanti)
                </span>
              </label>

              <div className="relative">
                <div
                  onClick={() => setOpenWilayahDropdown(true)}
                  className="border border-black/20 p-2 rounded-lg outline-none w-full flex flex-row gap-2 items-center"
                >
                  <input
                    placeholder="Wilayah"
                    type="text"
                    className="outline-none w-full border-none"
                  />

                  <i>
                    <IoChevronDownOutline />
                  </i>
                </div>
                {openWilayahDropdown && (
                  <div className="absolute border border-black/20 bg-white p-2 rounded-lg outline-none w-full flex flex-col gap-2 z-50 pt-2 max-h-40 overflow-scroll">
                    {semuaWilayah.map(
                      ({
                        id,
                        nama_wilayah,
                      }: {
                        id: string;
                        nama_wilayah: string;
                      }) => (
                        <div key={id} className="flex gap-2 items-center">
                          <input
                            id={id}
                            type="checkbox"
                            checked={userData.wilayahId.includes(id)}
                            onChange={(e) =>
                              handleWilayahChange(id, e.target.checked)
                            }
                          />
                          <label htmlFor={id}>{nama_wilayah}</label>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>
          </fieldset>

          <div className="flex flex-row gap-4 justify-end mt-4 items-center">
            <button
              type="button"
              onClick={() => setOpenCreateModal(false)}
              className="border border-black/20 p-2 px-4 rounded-full cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-black text-white p-2 px-4 rounded-full cursor-pointer"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateKaryawanModal;
