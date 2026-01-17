import { MdEdit } from "react-icons/md";
import type { IUserWithWilayah } from "../../../../types/types";
import { BsTrash } from "react-icons/bs";

type KaryawanTableProps = {
  usersData: IUserWithWilayah[];
};

const KaryawanTable = ({ usersData }: KaryawanTableProps) => {
  return (
    <table className="table-auto w-full mt-4 text-start rounded-lg overflow-hidden">
      <thead className="bg-zinc-900 text-white text-left">
        <tr>
          <th className="p-4">Nama Karyawan</th>
          <th className="p-4">Role</th>
          <th className="p-4">Wilayah</th>
          <th className="p-4">Tanggal Dibuat Akun</th>
          <th className="p-4">Aksi</th>
        </tr>
      </thead>

      <tbody className="bg-white">
        {usersData.map((user, index) => (
          <tr
            key={index}
            className="border-b border-black/20 hover:bg-zinc-900 hover:text-white"
          >
            <td className="p-4">{user.nama}</td>

            <td>{user.role}</td>

            <td className="p-4">
              {user.wilayah.length > 0
                ? user.wilayah.map((w) => w.wilayah.nama_wilayah).join(", ")
                : "-"}
            </td>

            <td className="p-4">
              {new Date(user.createdAt).toLocaleDateString("id-ID")}
            </td>

            <td className="space-x-2">
              <button className="rounded-lg bg-zinc-800 p-2 text-zinc-300 transition hover:bg-red-600 hover:text-white">
                <i>
                  <BsTrash />
                </i>
              </button>
              <button className="rounded-lg bg-zinc-800 p-2 text-zinc-300 transition hover:bg-blue-600 hover:text-white">
                <i>
                  <MdEdit />
                </i>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default KaryawanTable;
