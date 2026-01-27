// // src/assets/data/hasilAkhirData.ts

// // --- IMPOR DARI dataKampus.ts ---
// // Asumsi path import ke dataKampus.ts adalah benar
// import { dataKampus, type Major } from "@/data/dataKampus"; 
// // ---------------------------------

// export interface MajorRecommendation {
//   id: number;
//   name: string;
//   isRecommended: boolean;
// }

// // Interface CampusRecommendation dipertahankan sesuai tampilan card yang Anda inginkan
// export interface CampusRecommendation {
//   id: number | string; // Diubah agar bisa menerima string ID dari dataKampus
//   name: string;
//   location: string;
//   isFavorite: boolean;
//   tag: 'Favorit' | 'Negeri' | 'Swasta' | 'Internasional';
//   imageUrl: string; 
// }

// // Fungsi untuk memetakan data Major ke CampusRecommendation
// // Kita hanya akan mengambil 3 data kampus pertama sebagai contoh rekomendasi.
// const mapMajorToCampusRecommendation = (major: Major, index: number): CampusRecommendation => {
//     // Kita asumsikan lokasi dan status isFavorite
//     const location = major.id === "unikom" || major.id === "itb" || major.id === "telu" ? "Bandung" : "Lainnya";
//     const isFavorite = index === 1; // Contoh: Kampus kedua (ITB) dijadikan favorit

//     return {
//         id: major.id, // Menggunakan ID string dari dataKampus
//         name: major.name,
//         location: location,
//         isFavorite: isFavorite,
//         tag: major.category as 'Favorit' | 'Negeri' | 'Swasta' | 'Internasional', // Casting category ke tag
//         imageUrl: major.image, // Menggunakan image (background) sebagai imageUrl
//     };
// };

// // Mengambil 3 kampus (UNIKOM, ITB, TELKOM) dari dataKampus
// const recommendedCampusData: CampusRecommendation[] = [
//     dataKampus.Bandung.find(k => k.id === "unikom"),
//     dataKampus.Bandung.find(k => k.id === "itb"),
//     dataKampus.Mewah.find(k => k.id === "telu"),
// ].filter((k): k is Major => k !== undefined) // Memastikan data tidak undefined
//  .map(mapMajorToCampusRecommendation);


// export interface ResultData {
//   facultyName: string;
//   description: string[];
//   majorRecommendations: MajorRecommendation[];
//   campusRecommendations: CampusRecommendation[];
// }

// export const hasilAkhirData: ResultData = {
//   facultyName: 'Teknik dan Ilmu Komputer',
//   description: [
//     'Fakultas ini cocok banget buat kamu yang penasaran sama teknologi, suka mikir logis, dan ingin tahu gimana cara kerja aplikasi, website, robot, atau bahkan kecerdasan buatan.',
//     'Di sini kamu akan belajar membuat dan memahami berbagai teknologi—mulai dari merancang aplikasi, membangun jaringan internet, sampai mengembangkan sistem pintar seperti AI dan IoT.',
//     'Fakultas ini satu karena kamu enggak cuma belajar teori, tapi juga praktek langsung, bikin project, dan nyoba hal-hal baru yang inovatif.',
//   ],
//   majorRecommendations: [
//     { id: 1, name: 'Teknik Informatika', isRecommended: true },
//     { id: 2, name: 'Sistem Informasi', isRecommended: true }, // Untuk Anda!
//     { id: 3, name: 'Teknik Komputer', isRecommended: true },
//     { id: 4, name: 'Teknik Elektro', isRecommended: false },
//     { id: 5, name: 'Matematika', isRecommended: false },
//   ],
//   campusRecommendations: recommendedCampusData, // Menggunakan data yang sudah dipetakan
// };