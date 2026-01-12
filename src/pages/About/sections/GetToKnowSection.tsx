import Lulu from '@/assets/images/LuluHappy.png'

const GetToKnowSection = () => {
  return (
    <div className='flex items-center text-white p-8 gap-20'>
        <img src={Lulu} className='w-[410px] h-[592px]' />
        <div className="bg-gradient-to-bl from-[#7DD5D5] to-primary-200 p-15 rounded-tr-[8rem] rounded-bl-[8rem]">
            <h1 className='font-bold text-5xl mb-8'>Mengenal TanyaKampus</h1>
            <p className='text-xl'>Pilih jurusan gak pakai galau! TanyaKampus hadir membantu kamu menemukan rekomendasi kampus dan program studi yang paling pas lewat kuesioner minat bakat yang simpel dan akurat. Tentukan pilihanmu sekarang!</p>
        </div>
    </div>
  )
}

export default GetToKnowSection