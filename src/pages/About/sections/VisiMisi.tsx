import VisiMisiItem from "../components/VisiMisiItem";

const VisiMisi = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-2 gap-60">
        <VisiMisiItem
          label="Visi TanyaKampus"
          title="Kompas Utama Pendidikan Indonesia"
          desc="Visi kami adalah memastikan setiap calon mahasiswa menemukan jurusan dan kampus idaman yang paling sesuai dengan potensi diri mereka."
        />

        <VisiMisiItem
          label="Misi TanyaKampus"
          title="“Guide interests, find campus, and secure future”"
          desc="Melalui kuesioner cerdas, kami membantu kamu mengenali minat bakat agar tidak salah pilih jurusan demi masa depan yang lebih cerah."
        />
      </div>
    </section>
  );
};

export default VisiMisi;
