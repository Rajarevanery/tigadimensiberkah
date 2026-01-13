import { ImSearch } from "react-icons/im";
import Loading from "../../../_global/Loading";
import { HiDownload } from "react-icons/hi";
import { useGetAllUser } from "../../../lib/queries/queries";
import { IoPeople } from "react-icons/io5";
import { BsFillGridFill } from "react-icons/bs";
import { GoListUnordered } from "react-icons/go";
import { useState } from "react";
import KaryawanTable from "./components/KaryawanTable";
import CreateKaryawanModal from "./components/CreateKaryawanModal";

const AllKaryawan = () => {
  const { data, isPending } = useGetAllUser();
  const [listView, setListView] = useState<string>("list");
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);

  if (isPending) return <Loading />;

  const handleListView = (type: string) => {
    setListView(type);
  };

  return (
    <section className="border border-black/20 p-6 w-full rounded-lg">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-6 p-3 border border-black/20 rounded-xl items-center">
          <i>
            <ImSearch size={15} />
          </i>
          <input
            placeholder="Cari Karyawan"
            type="text"
            className="border-none outline-none"
          />
        </div>

        <div className="flex flex-row gap-6">
          <div className="flex flex-row border border-black/20 p-3 px-6 rounded-lg items-center gap-4 hover:bg-black hover:text-white transition cursor-pointer">
            <i>
              <HiDownload size={20} />
            </i>
            <button className="cursor-pointer">Download</button>
          </div>

          <div
            onClick={() => setOpenCreateModal((prevState) => !prevState)}
            className="flex flex-row border border-black/20 p-3 px-6 rounded-lg items-center gap-4 hover:bg-black hover:text-white transition cursor-pointer"
          >
            <i>
              <IoPeople size={20} />
            </i>
            <button className="cursor-pointer">Tambah Karyawan</button>
          </div>

          <div className="flex flex-row items-center justify-center rounded-lg">
            <div
              className={`p-3 px-8 border border-black/20 cursor-pointer transition rounded-l-lg ${
                listView === "list" && "bg-black text-white"
              }`}
              onClick={() => handleListView("list")}
            >
              <i>
                <GoListUnordered size={20} />
              </i>
            </div>

            <div
              className={`p-3 px-8 border border-black/20 cursor-pointer transition rounded-r-lg ${
                listView === "grid" && "bg-black text-white"
              }`}
              onClick={() => handleListView("grid")}
            >
              <i>
                <BsFillGridFill size={20} />
              </i>
            </div>
          </div>
        </div>
      </div>

      {/* TABEL KARYAWAN */}
      <KaryawanTable usersData={data} />
      {/* TABEL KARYAWAN */}

      {/* DIALOGUE CREATE KARYAWAN */}
      {openCreateModal && (
        <CreateKaryawanModal setOpenCreateModal={setOpenCreateModal} />
      )}
      {/* DIALOGUE CREATE KARYAWAN */}
    </section>
  );
};

export default AllKaryawan;
