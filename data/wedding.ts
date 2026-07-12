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
    parents: "Putri dari Bapak Fulan & Ibu Fulanah",
    instagram: "kiki.example",
    photo: "/images/bride.svg",
  },
  groom: {
    nickname: "Hafid",
    fullName: "Hafid Dwi Hibatullah",
    parents: "Putra dari Bapak Fulan & Ibu Fulanah",
    instagram: "hafid.example",
    photo: "/images/groom.svg",
  },

  // Format ISO dengan offset WIB (+07:00) — dipakai countdown
  date: "2026-08-30T09:00:00+07:00",
  dateDisplay: "30 · 08 · 2026",
  dateLong: "Sabtu, 30 Agustus 2026",

  quote: {
    text: "“Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.”",
    source: "QS. Ar-Rum : 21",
  },

  events: [
    {
      name: "Akad Nikah",
      icon: "ring" as const,
      date: "Sabtu, 30 Agustus 2026",
      time: "09.00 WIB",
      venue: "Masjid Al-Ikhlas",
      address: "Jl. Mawar No. 10, Surabaya",
      mapsUrl: "https://maps.google.com/?q=Masjid+Al-Ikhlas+Surabaya",
    },
    {
      name: "Resepsi",
      icon: "flower" as const,
      date: "Sabtu, 30 Agustus 2026",
      time: "11.00 – 14.00 WIB",
      venue: "Gedung Graha Rahayu",
      address: "Jl. Mawar No. 10, Surabaya",
      mapsUrl: "https://maps.google.com/?q=Gedung+Graha+Rahayu+Surabaya",
    },
  ],

  gallery: [
    "/images/gallery-1.svg",
    "/images/gallery-2.svg",
    "/images/gallery-3.svg",
    "/images/gallery-4.svg",
    "/images/gallery-5.svg",
    "/images/gallery-6.svg",
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

export type WeddingEvent = (typeof wedding.events)[number];
export type StoryItem = (typeof wedding.story)[number];
export type GiftAccount = (typeof wedding.gifts)[number];
