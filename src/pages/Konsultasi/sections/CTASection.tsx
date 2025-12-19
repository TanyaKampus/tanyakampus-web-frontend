import Button from "@/components/Button"

const CTASection = () => {
  return (
    <div className="px-20 py-24 text-center max-w-4xl m-auto text-neutral">
        <h1 className="text-4xl font-bold mb-6">Cari Mentor Konsultasi Terbaikmu</h1>
        <p className="text-2xl font-medium mb-6">Lihat profil lengkap mentor-mentor kami dan pilih yang paling sesuai dengan kebutuhanmu.</p>
        <Button label="Konsultasi Sekarang" className="m-auto"/>
    </div>
  )
}

export default CTASection