import type { IUserWithWilayah } from "../../../../types/types";

type KaryawanTableProps = {
  usersData: IUserWithWilayah[];
};

const KaryawanTable = ({ usersData }: KaryawanTableProps) => {
  return (
    <table className="table-auto w-full mt-4 text-start rounded-lg overflow-hidden">
      <thead className="bg-zinc-900 text-white text-left">
        <tr>
          <th className="p-4">Nama Karyawan</th>
          <th className="p-4">Wilayah</th>
          <th className="p-4">Tanggal Dibuat Akun</th>
        </tr>
      </thead>

      <tbody className="bg-white">
        {usersData.map((user, index) => (
          <tr
            key={index}
            className="border-b border-black/20 hover:bg-zinc-800 hover:text-white"
          >
            <td className="p-4">{user.nama}</td>

            <td className="p-4">
              {user.wilayah.length > 0
                ? user.wilayah.map((w) => w.wilayah.nama_wilayah).join(", ")
                : "-"}
            </td>

            <td className="p-4">
              {new Date(user.createdAt).toLocaleDateString("id-ID")}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default KaryawanTable;
