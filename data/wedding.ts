// ============================================================
// DATA UNDANGAN — SEMUA PLACEHOLDER, GANTI DI SINI SAJA
// Semua section membaca dari file ini. Tidak ada data hardcode
// di komponen.
// ============================================================

export const wedding = {
  // Nama panggilan — dipakai di cover, hero, title
  bride: {
    nickname: "Kiki",
    fullName: "Nur Chulukiah Munawaroh",
    relation: "Putri dari", // label relasi di kartu couple
    parents: "Bapak Anwar & (Almh.) Ibu Ngatminah",
    location: "Wringinanom, Kabupaten Gresik", // opsional — mis. "dari Surabaya"
    instagram: "https://www.instagram.com/nurchlkiah",
    photo: "/images/pengantin-wanita.webp",
  },
  groom: {
    nickname: "Hafid",
    fullName: "Hafid Dwi Hibatullah",
    relation: "Putra dari",
    parents: "Bapak Ismuaji Sodiq & Ibu Siti Maimunah",
    location: "Mandonga, Kota Kendari",
    instagram: "https://www.instagram.com/hafiddh",
    photo: "/images/pengantin-pria.webp",
  },

  // Sambutan pembuka di Hero
  intro: {
    salam: "Assalamu'alaikum Warahmatullahi Wabarakatuh",
    text: "Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan pernikahan kami. Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.",
  },

  // Format ISO dengan offset WIB (+07:00) — dipakai countdown
  date: "2026-10-10T09:00:00+07:00",
  dateDisplay: "10 · 10 · 2026",
  dateLong: "Sabtu, 10 Oktober 2026",

  quote: {
    text: "“Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berfikir.”",
    source: "QS. Ar-Rum : 21",
  },

  // Akad & resepsi satu lokasi — ditampilkan gaya undangan fisik
  acara: {
    akad: "09.00 WIB s.d Selesai",
    resepsi: "16.00 WIB s.d Selesai",
    venue: "Kediaman Mempelai Wanita",
    address: "Kepuhklagen, Wringinanom, Gresik",
    mapsUrl: "https://maps.app.goo.gl/evnZUZdvXnhpPAPD7",
  },

  gallery: [
    "/images/galeri-1.webp",
    "/images/galeri-2.webp",
    "/images/galeri-3.webp",
    "/images/galeri-4.webp",
    "/images/galeri-5.webp",
    "/images/galeri-6.webp",
  ],

  story: [
    {
      title: "Awal Pertemuan",
      text: "Kami dipertemukan melalui perantara paman. Meski belum pernah bertemu, percakapan pertama melalui telepon menjadi awal dari perjalanan kami.\n\nDengan niat yang baik untuk mencari pasangan hidup, kami mulai saling mengenal dan menemukan kenyamanan serta kecocokan dalam setiap percakapan.",
    },
    {
      title: "Lamaran",
      text: "Seiring waktu, rasa percaya dan keyakinan kami semakin kuat. Dengan restu kedua keluarga, kami memantapkan hati untuk melangkah bersama melalui prosesi lamaran.\n\nMomen ini menjadi awal dari komitmen kami untuk menuju kehidupan sebagai pasangan suami istri.",
    },
    {
      title: "Menuju Ikatan Suci",
      text: "Setelah melalui perjalanan yang penuh makna, kami yakin bahwa pertemuan ini adalah bagian dari rencana terbaik-Nya.\n\nInsyaAllah, pada Oktober 2026 kami akan mengikat janji suci dalam akad pernikahan. Semoga menjadi awal perjalanan seumur hidup yang penuh cinta, keberkahan, dan ridha Allah SWT.",
    },
  ],

  gifts: [
    {
      bank: "Bank Jago",
      number: "100515016530",
      holder: "Nur Chulukiah Munawaroh",
      logo: "/images/jago-logo.webp",
    },
    {
      bank: "BRI",
      number: "185601002620501",
      holder: "Hafid Dwi Hibatullah",
      logo: "/images/bri-logo.webp",
    },
  ],

  music: "/music/music-1.mp3",
} as const;

export type StoryItem = (typeof wedding.story)[number];
export type GiftAccount = (typeof wedding.gifts)[number];
