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
      year: "April 2026",
      title: "Awal Sebuah Pertemuan",
      text: "Segala sesuatu yang indah sering kali berawal dari cara yang sederhana. Pada bulan April 2026, kami dipertemukan melalui perantara paman yang dengan tulus mengenalkan kami satu sama lain. Meski belum pernah bertatap muka, percakapan pertama melalui telepon menjadi langkah awal dari sebuah perjalanan yang tak pernah kami bayangkan sebelumnya.\n\nSejak awal, kami sepakat bahwa perkenalan ini bukan sekadar untuk saling mengenal, melainkan dengan niat yang baik dan tujuan yang jelas: mencari pasangan hidup. Dari setiap percakapan yang terjalin, kami mulai menemukan kenyamanan, kecocokan, dan keyakinan bahwa Allah sedang mempertemukan kami pada waktu yang tepat.",
    },
    {
      year: "Juni 2026",
      title: "Mengikat Janji dalam Lamaran",
      text: "Seiring berjalannya waktu, komunikasi yang kami bangun menghadirkan rasa percaya dan keyakinan yang semakin kuat. Kami belajar memahami satu sama lain, menerima segala kelebihan dan kekurangan, serta memantapkan hati untuk melangkah ke tahap yang lebih serius.\n\nPada bulan Juni 2026, dengan restu kedua keluarga, kami mengikat komitmen melalui prosesi lamaran. Momen tersebut menjadi simbol kesungguhan kami untuk menjaga amanah, saling mendukung dalam setiap langkah, dan mempersiapkan diri menuju kehidupan baru sebagai pasangan suami istri.",
    },
    {
      year: "Oktober 2026",
      title: "Menuju Ikatan Suci",
      text: "Setelah melalui perjalanan yang singkat namun penuh makna, kami meyakini bahwa setiap proses yang telah dilalui adalah bagian dari rencana terbaik-Nya. Dengan penuh rasa syukur, kami mantap melangkah menuju hari yang telah lama kami nantikan.\n\nPada bulan Oktober 2026, insyaAllah kami akan mengikat janji suci dalam akad pernikahan. Semoga ikatan ini menjadi awal dari perjalanan seumur hidup yang dipenuhi cinta, kasih sayang, keberkahan, dan ridha Allah SWT, hingga kelak bersama menua dalam kebahagiaan.",
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
