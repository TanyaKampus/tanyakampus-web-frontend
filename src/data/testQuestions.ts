export interface TestQuestion {
  id: number;
  question: string;
  category: "Teknik" | "Ilmu Komputer" | "Bisnis" | "Ekonomi" | "Ilmu Sosial" | "Politik" | "Desain" | "Seni" | "General";
}

export const minatQuestions: TestQuestion[] = [

  {
    id: 1,
    question:
      "Kamu cukup menikmati kegiatan yang berhubungan sama merakit, atau memperbaiki alat/mesin (misalnya elektronik, motor, komputer)?",
    category: "Teknik",
  },
  {
    id: 2,
    question:
      "Kamu ingin langsung jadi orang yang turun tangan membetulkan kode atau arsitektur jaringan secara teknis kalau ada masalah error di sistem?",
    category: "Ilmu Komputer",
  },
  {
    id: 3,
    question:
      "Kamu tertarik buat punya usaha sendiri suatu hari nanti, kayak buka toko, jualan online, atau bangun brand kamu sendiri?",
    category: "Bisnis",
  },

  // Soal Bisnis dan Ekonomi
  {
    id: 4,
    question:
      "Kamu mau kalau mikir soal uang, harga barang, untung-rugi, atau cari faktor kenapa harga sesuatu bisa naik dan turun?",
    category: "Ekonomi",
  },
  {
    id: 5,
    question:
      "Kamu merasa semangat kalau harus sering berinteraksi sama orang, dengerin cerita mereka, dan bantu nyelesaiin masalah mereka?",
    category: "Ilmu Sosial",
  },
  {
    id: 6,
    question:
      "Kamu sering penasaran sama berita pemerintahan, pemilu, kebijakan negara, atau hal-hal yang ngatur kehidupan masyarakat luas?",
    category: "Politik",
  },

  {
    id: 7,
    question:
      "Kamu memiliki ketertarikan pada elemen warna, bentuk, dan estetika dalam mendesain suatu karya?",
    category: "Desain",
  },
  {
    id: 8,
    question:
      "Kamu merasa selalu terinspirasi oleh seni, musik, atau ekspresi kreatif lainnya?",
    category: "Seni",
  },
  {
    id: 9,
    question:
      "Kamu merasa lebih berenergi ketika banyak berinteraksi dan ngobrol langsung dengan orang lain dibanding ketika sendirian?",
    category: "General",
  },
  //Desain dan Seni
  {
    id: 10,
    question:
      "Saat mengambil keputusan penting, kamu lebih mengandalkan data, fakta, dan analisis daripada firasat atau perasaan?",
    category: "General",
  },
  {
    id: 11,
    question:
      "Kamu lebih nyaman jika punya rencana kerja yang jelas dan langkah-langkah tertulis, daripada bekerja mengalir dan improvisasi di tempat?",
    category: "General",
  }
];
