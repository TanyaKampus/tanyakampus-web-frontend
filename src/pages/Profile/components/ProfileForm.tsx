import { useState } from "react";
import { userDummy } from "@/data/userDummy";

const ProfileForm = () => {
  const [form, setForm] = useState(userDummy);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2 className="font-bold text-lg mb-4">Identitas</h2>

      <div className="space-y-5">
        <div>
          <label className="text-sm text-[#BDBDBD]">Nama</label>
          <input
            type="text"
            name="nama"
            value={form.nama}
            onChange={handleChange}
            className="w-full mt-1 border-[#D7D7D7] border-2 px-3 py-2 rounded-lg"
          />
        </div>

        <div>
          <label className="text-sm text-[#BDBDBD]">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full mt-1 border-[#D7D7D7] border-2 px-3 py-2 rounded-lg"
          />
        </div>

        <div>
          <label className="text-sm text-[#BDBDBD]">Pendidikan Terakhir</label>
          <input
            type="text"
            name="pendidikan"
            value={form.pendidikan}
            onChange={handleChange}
            className="w-full mt-1 border-[#D7D7D7] border-2 px-3 py-2 rounded-lg"
          />
        </div>

        <div>
          <label className="text-sm text-[#BDBDBD]">No Telepon</label>
          <input
            type="text"
            name="telepon"
            value={form.telepon}
            onChange={handleChange}
            className="w-full mt-1 border-[#D7D7D7] border-2 px-3 py-2 rounded-lg"
          />
        </div>

        <div>
          <label className="text-sm text-[#BDBDBD]">Jenis Kelamin</label>
          <input
            type="text"
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="w-full mt-1 border-[#D7D7D7] border-2 px-3 py-2 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
