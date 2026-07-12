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
      year: "2020",
      title: "Pertama Bertemu",
      text: "Kami dipertemukan di tempat yang tak terduga. Percakapan singkat yang ternyata menjadi awal dari segalanya.",
    },
    {
      year: "2023",
      title: "Menjalin Komitmen",
      text: "Seiring waktu, kami semakin yakin untuk melangkah bersama dan saling menguatkan dalam setiap keadaan.",
    },
    {
      year: "2026",
      title: "Menuju Halal",
      text: "Dengan restu kedua orang tua, kami memutuskan menyempurnakan separuh agama.",
    },
  ],

  gifts: [
    {
      bank: "BCA",
      number: "1234567890",
      holder: "Nur Chulukiah Munawaroh",
    },
    {
      bank: "Mandiri",
      number: "0987654321",
      holder: "Hafid Dwi Hibatullah",
    },
  ],

  music: "/music.mp3", // drop file mp3 kamu ke public/music.mp3
} as const;

export type StoryItem = (typeof wedding.story)[number];
export type GiftAccount = (typeof wedding.gifts)[number];
