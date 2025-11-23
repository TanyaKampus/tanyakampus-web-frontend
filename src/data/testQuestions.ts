export interface TestQuestion {
  id: number;
  question: string;
  category: "Teknologi" | "Bisnis" | "Politik" | "Seni" | "General";
}

export const minatQuestions: TestQuestion[] = [
  // Soal Teknologi
  {
    id: 1,
    question:
      "Kamu lebih tertarik untuk benar-benar mengutak-atik hardware atau coding untuk menciptakan solusi teknologi, daripada hanya membaca teorinya?",
    category: "Teknologi",
  },
  {
    id: 2,
    question:
      "Kalau ada masalah error di sistem, kamu ingin langsung jadi orang yang turun tangan membetulkan kode atau arsitektur jaringan secara teknis?",
    category: "Teknologi",
  },
  {
    id: 3,
    question:
      "Kamu selalu merasa senang jika bekerja untuk menyelesaikan proyek proyek teknikal?",
    category: "Teknologi",
  },

  // Soal Bisnis dan Ekonomi
  {
    id: 4,
    question:
      "Kamu lebih suka jadi orang yang langsung mengambil keputusan berisiko tinggi daripada hanya membuat laporan analisisnya saja?",
    category: "Bisnis",
  },
  {
    id: 5,
    question:
      "Kamu tertarik untuk secara langsung memimpin tim penjualan atau negosiasi di lapangan untuk mencapai target bisnis?",
    category: "Bisnis",
  },
  {
    id: 6,
    question:
      "Kamu merasa tertantang untuk terjun langsung membuat dan menjual produk/jasa yang nyata di pasar, dan langsung melihat hasilnya?",
    category: "Bisnis",
  },
  // Ilmu Sosial dan Politik
  {
    id: 7,
    question:
      "Kamu lebih tertarik untuk terjun langsung ke lapangan, bertemu warga, dan mengorganisir aksi sosial?",
    category: "Politik",
  },
  {
    id: 8,
    question:
      "Kamu bersedia menjadi penengah atau mediator langsung dalam konflik antar individu atau kelompok?",
    category: "Politik",
  },
  {
    id: 9,
    question:
      "Kamu punya minat yang kuat untuk secara langsung mengajar, atau melatih?",
    category: "Politik",
  },
  //Desain dan Seni
  {
    id: 10,
    question:
      "Kamu merasa tertarik untuk mengekspresikan ide kreatif melalui gambar atau seni visual?",
    category: "Seni",
  },
  {
    id: 11,
    question:
      "Kamu memiliki ketertarikan pada elemen warna, bentuk, dan estetika dalam desain?",
    category: "Seni",
  },
  {
    id: 12,
    question:
      "Kamu merasa terinspirasi oleh seni, musik, atau ekspresi kreatif lainnya?",
    category: "Seni",
  },
  //GENERAL
  {
    id: 13,
    question:
      "Kamu merasa lebih berenergi ketika banyak berinteraksi dan ngobrol langsung dengan orang lain dibanding ketika sendirian?",
    category: "General",
  },
  {
    id: 14,
    question:
      "Saat mengambil keputusan penting, kamu lebih mengandalkan data, fakta, dan analisis daripada firasat atau perasaan?",
    category: "General",
  },
  {
    id: 15,
    question:
      "Kamu lebih nyaman jika punya rencana kerja yang jelas dan langkah-langkah tertulis, daripada bekerja mengalir dan improvisasi di tempat?",
    category: "General",
  },
];
