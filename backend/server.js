try {
  process.loadEnvFile();
} catch (error) {
  console.warn('File .env tidak ditemukan — pastikan sudah dibuat dari .env.example');
}

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const contentRoutes = require('./routes/contentRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');
const activityRoutes = require('./routes/activityRoutes');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ message: 'Healthy Life API sedang berjalan' });
});

app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/activities', activityRoutes);

// /api/* yang tidak cocok ke route manapun -> 404 JSON (bukan halaman HTML)
app.use('/api', (req, res) => {
  res.status(404).json({ message: 'Endpoint tidak ditemukan' });
});

// Sajikan hasil build web (opsional) — otomatis aktif kalau folder web/dist ada.
// Ini yang memungkinkan backend + web dijalankan sebagai SATU server saat deploy.
const webDistPath = path.join(__dirname, '../web/dist');
if (fs.existsSync(webDistPath)) {
  app.use(express.static(webDistPath));
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(webDistPath, 'index.html'));
  });
  console.log('Web build ditemukan — menyajikan web app dari', webDistPath);
} else {
  app.get('/', (req, res) => {
    res.json({
      message: 'Healthy Life API sedang berjalan',
      info: 'Web app belum di-build. Jalankan "npm run build" di folder web/ supaya disajikan juga dari server ini.',
    });
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));
