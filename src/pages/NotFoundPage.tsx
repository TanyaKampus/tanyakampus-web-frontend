import Button from "@/components/Button";

const NotFoundPage = () => {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center relative">
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-10 md:p-16 shadow-lg border border-white/10">
          <h1 className="text-7xl md:text-[120px] font-extrabold leading-none text-neutral">
            404
          </h1>

          <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-neutral">
            Oopsie, Halaman tidak ditemukan
          </h2>

          <p className="mt-3 text-sm md:text-base text-neutral max-w-xl mx-auto">
            Maaf, halaman yang kamu cari nggak ada atau sudah dipindah. Coba cek
            kembali URL atau kembali ke halaman utama.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <Button
              label="Kembali ke Beranda"
              variant="solid-dark"
              onClick={() => window.history.back()}
            />
          </div>

          <div className="mt-10 text-xs text-neutral">
            Jika kamu percaya ini kesalahan, silakan hubungi admin.
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
