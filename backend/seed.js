try {
  process.loadEnvFile();
} catch (error) {
  console.warn('File .env tidak ditemukan — pastikan sudah dibuat dari .env.example');
}

const mongoose = require('mongoose');
const Content = require('./models/Content');

const sampleContent = [
  {
    title: 'Pentingnya Sarapan Sehat untuk Memulai Hari',
    type: 'artikel',
    category: 'gizi',
    summary: 'Sarapan yang tepat membantu menjaga energi dan konsentrasi sepanjang pagi.',
    body: 'Sarapan sering disebut sebagai waktu makan terpenting dalam sehari. Setelah tubuh berpuasa semalaman, sarapan membantu mengembalikan kadar gula darah dan memberi energi untuk beraktivitas. Pilih menu yang mengandung karbohidrat kompleks, protein, dan serat, misalnya roti gandum dengan telur, atau oatmeal dengan potongan buah. Melewatkan sarapan dapat menurunkan konsentrasi dan memicu keinginan makan berlebihan saat siang hari.',
    imageUrl: 'https://picsum.photos/seed/sarapan-sehat/600/400',
  },
  {
    title: 'Piring Makan Sehat: Panduan Gizi Seimbang',
    type: 'infografis',
    category: 'gizi',
    summary: 'Panduan sederhana membagi piring makan agar gizi tetap seimbang.',
    body: 'Konsep piring makan sehat membagi porsi makan menjadi beberapa bagian: setengah piring untuk sayur dan buah, seperempat untuk sumber karbohidrat seperti nasi atau kentang, dan seperempat lagi untuk sumber protein seperti ikan, ayam, tahu, atau tempe. Jangan lupa tambahkan segelas air putih dan batasi minuman manis. Pola ini membantu memastikan tubuh mendapat gizi seimbang di setiap waktu makan.',
    imageUrl: 'https://picsum.photos/seed/piring-sehat/600/400',
  },
  {
    title: 'Mengenal Porsi Makan yang Tepat Setiap Hari',
    type: 'artikel',
    category: 'gizi',
    summary: 'Cara mudah mengukur porsi makan menggunakan tangan sendiri.',
    body: 'Ukuran porsi yang tepat sama pentingnya dengan jenis makanan yang dipilih. Sebagai gambaran sederhana, porsi nasi bisa disetarakan dengan kepalan tangan, porsi lauk protein seukuran telapak tangan, dan porsi sayur bisa lebih banyak karena rendah kalori. Makan dengan porsi yang sesuai membantu menjaga berat badan ideal dan mencegah kebiasaan makan berlebihan.',
    imageUrl: 'https://picsum.photos/seed/porsi-makan/600/400',
  },
  {
    title: '5 Gerakan Peregangan Ringan di Pagi Hari',
    type: 'artikel',
    category: 'olahraga',
    summary: 'Lima gerakan peregangan ringan untuk melancarkan tubuh di pagi hari.',
    body: 'Peregangan di pagi hari membantu melancarkan aliran darah dan mengurangi kekakuan otot setelah tidur semalaman. Beberapa gerakan sederhana yang bisa dicoba: putaran leher perlahan, peregangan bahu, sentuhan jari kaki, peregangan betis, dan putaran pinggang. Lakukan masing-masing gerakan selama 15-30 detik tanpa memaksakan diri, cukup sampai terasa tarikan ringan pada otot.',
    imageUrl: 'https://picsum.photos/seed/peregangan-pagi/600/400',
  },
  {
    title: 'Yuk, Olahraga 15 Menit Saja di Rumah',
    type: 'video',
    category: 'olahraga',
    summary: 'Rangkaian gerakan olahraga singkat yang bisa dilakukan tanpa alat di rumah.',
    body: 'Tidak perlu ke gym untuk tetap aktif bergerak. Olahraga ringan selama 15 menit di rumah seperti jumping jack, squat, plank, dan naik-turun tangga sudah cukup memberi manfaat bagi kesehatan jantung dan kebugaran tubuh jika dilakukan rutin. Kombinasikan gerakan kardio ringan dengan latihan kekuatan sederhana, dan jangan lupa pemanasan sebelum memulai.',
    imageUrl: 'https://picsum.photos/seed/olahraga-rumah/600/400',
    videoUrl: '',
  },
  {
    title: 'Jalan Kaki 30 Menit, Ini Segudang Manfaatnya',
    type: 'artikel',
    category: 'olahraga',
    summary: 'Manfaat rutin berjalan kaki bagi jantung dan berat badan.',
    body: 'Jalan kaki adalah salah satu bentuk olahraga paling sederhana namun memiliki banyak manfaat. Berjalan kaki selama 30 menit setiap hari dapat membantu menjaga kesehatan jantung, mengontrol berat badan, memperbaiki suasana hati, serta menurunkan risiko penyakit kronis seperti diabetes tipe 2 dan tekanan darah tinggi. Jalan kaki juga bisa dilakukan di mana saja tanpa memerlukan peralatan khusus.',
    imageUrl: 'https://picsum.photos/seed/jalan-kaki/600/400',
  },
  {
    title: 'Mengenal Tanda-Tanda Stres dan Cara Mengatasinya',
    type: 'artikel',
    category: 'kesehatan-mental',
    summary: 'Mengenali gejala stres sejak dini dan cara mengelolanya.',
    body: 'Stres adalah respons alami tubuh terhadap tekanan, namun jika dibiarkan berlarut dapat memengaruhi kesehatan fisik dan mental. Tanda-tandanya antara lain sulit tidur, mudah marah, sakit kepala, dan sulit berkonsentrasi. Cara mengatasinya bisa dengan mengatur napas dalam-dalam, meluangkan waktu istirahat, berbicara dengan orang terdekat, atau melakukan aktivitas yang disukai untuk mengalihkan pikiran dari sumber tekanan.',
    imageUrl: 'https://picsum.photos/seed/kelola-stres/600/400',
  },
  {
    title: 'Manfaat Tidur Cukup bagi Kesehatan Mental',
    type: 'artikel',
    category: 'kesehatan-mental',
    summary: 'Hubungan antara kualitas tidur dan kesehatan mental sehari-hari.',
    body: 'Tidur yang cukup, sekitar 7-9 jam bagi orang dewasa, berperan penting dalam menjaga kesehatan mental. Kurang tidur dapat meningkatkan risiko kecemasan, suasana hati yang mudah berubah, dan sulit berkonsentrasi. Membangun rutinitas tidur yang konsisten, membatasi penggunaan gawai sebelum tidur, dan menciptakan suasana kamar yang nyaman dapat membantu meningkatkan kualitas tidur.',
    imageUrl: 'https://picsum.photos/seed/tidur-cukup/600/400',
  },
  {
    title: 'Cara Mencuci Tangan yang Benar untuk Mencegah Penyakit',
    type: 'infografis',
    category: 'pencegahan-penyakit',
    summary: 'Langkah-langkah mencuci tangan yang benar untuk mencegah penyakit.',
    body: 'Mencuci tangan dengan sabun dan air mengalir merupakan salah satu cara paling efektif untuk mencegah penyebaran kuman dan penyakit. Langkahnya meliputi membasahi tangan, menggunakan sabun, menggosok seluruh permukaan tangan termasuk sela jari dan kuku selama minimal 20 detik, membilas dengan air bersih, lalu mengeringkan dengan kain atau tisu bersih. Lakukan terutama sebelum makan, setelah dari toilet, dan setelah beraktivitas di luar rumah.',
    imageUrl: 'https://picsum.photos/seed/cuci-tangan/600/400',
  },
  {
    title: 'Imunisasi: Investasi Kesehatan Sejak Dini',
    type: 'artikel',
    category: 'pencegahan-penyakit',
    summary: 'Pentingnya imunisasi untuk kekebalan individu dan masyarakat.',
    body: 'Imunisasi membantu tubuh membentuk kekebalan terhadap berbagai penyakit menular sebelum benar-benar terpapar. Selain melindungi individu, imunisasi yang dilakukan secara luas juga membantu melindungi masyarakat sekitar melalui kekebalan kelompok. Penting untuk mengikuti jadwal imunisasi yang dianjurkan, baik untuk anak-anak maupun orang dewasa, sesuai rekomendasi tenaga kesehatan.',
    imageUrl: 'https://picsum.photos/seed/imunisasi/600/400',
  },
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Terhubung ke MongoDB, mulai seeding...');

    await Content.deleteMany();
    await Content.insertMany(sampleContent);

    console.log(`${sampleContent.length} konten berhasil ditambahkan`);
    process.exit(0);
  } catch (error) {
    console.error('Gagal seed data:', error.message);
    process.exit(1);
  }
};

seedData();
