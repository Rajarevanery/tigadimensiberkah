import { MdEdit } from "react-icons/md";
import { BsTrash } from "react-icons/bs";
import type { IUserWithWilayah } from "../../../../types/types";

type KaryawanTableProps = {
  usersData: IUserWithWilayah[];
};

const KaryawanCard = ({ usersData }: KaryawanTableProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-4">
      {usersData.map((user) => (
        <div
          key={user.id}
          className="group rounded-2xl bg-zinc-900 p-5 text-white shadow-md"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold tracking-tight">
                {user.nama}
              </h3>
              <p className="text-sm text-zinc-400">{user.email}</p>
            </div>

            <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs uppercase tracking-wide text-zinc-300">
              {user.role}
            </span>
          </div>

          <div className="my-4 h-px bg-zinc-800" />

          <div className="space-y-3 text-sm text-zinc-300">
            <div>
              <p className="text-xs uppercase text-zinc-500">Wilayah</p>
              <p className="mt-1">
                {user.wilayah.length > 0
                  ? user.wilayah.map((w) => w.wilayah.nama_wilayah).join(", ")
                  : "-"}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase text-zinc-500">Tanggal Dibuat</p>
              <p className="mt-1">
                {new Date(user.createdAt).toLocaleDateString("id-ID")}
              </p>
            </div>
          </div>

          <div className="mt-5 flex justify-end gap-2">
            <button className="rounded-lg bg-zinc-800 p-2 text-zinc-300 transition hover:bg-red-600 hover:text-white">
              <BsTrash />
            </button>
            <button className="rounded-lg bg-zinc-800 p-2 text-zinc-300 transition hover:bg-blue-600 hover:text-white">
              <MdEdit />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KaryawanCard;
