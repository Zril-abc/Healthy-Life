# Healthy Life — Backend API

Backend untuk aplikasi edukasi kesehatan **Healthy Life**. Dibangun dengan Node.js, Express 5, dan MongoDB (Mongoose), dengan autentikasi JWT.

## Struktur Folder

```
healthy-life-backend/
├── config/db.js         # koneksi ke MongoDB
├── models/               # skema Mongoose (User, Content, Favorite, Activity)
├── middleware/auth.js    # verifikasi token JWT
├── controllers/          # logika untuk tiap fitur
├── routes/                # routing Express
├── seed.js                # skrip pengisi 10 konten kesehatan contoh
└── server.js              # entry point
```

## 1. Install dependencies
```
npm install
```

## 2. Buat database MongoDB gratis (MongoDB Atlas)
1. Daftar/masuk di https://www.mongodb.com/cloud/atlas
2. Buat cluster gratis (M0)
3. Di **Database Access**, buat database user (username & password)
4. Di **Network Access**, tambahkan `0.0.0.0/0` (allow access from anywhere) — cukup untuk keperluan tugas
5. Klik **Connect → Drivers**, salin connection string-nya

## 3. Konfigurasi .env
Salin `.env.example` menjadi `.env`, lalu isi:
```
PORT=5000
MONGO_URI=<connection string dari Atlas, ganti <password> dengan password user>
JWT_SECRET=<bebas, string acak rahasia>
```

## 4. Isi data contoh
```
npm run seed
```
Mengisi 10 konten kesehatan contoh (artikel, video, infografis, 4 kategori) ke database.

## 5. Jalankan server
```
npm run dev
```
Server aktif di `http://localhost:5000`. Cek `http://localhost:5000/` di browser — kalau muncul pesan JSON, backend sudah jalan.

## API Endpoints

| Method | Endpoint | Auth | Keterangan |
|---|---|---|---|
| POST | /api/auth/register | - | Daftar akun baru → dapat token |
| POST | /api/auth/login | - | Login → dapat token |
| GET | /api/auth/me | ✓ | Info user yang sedang login |
| GET | /api/content | ✓ | Daftar konten (query: `category`, `type`, `search`) |
| GET | /api/content/:id | ✓ | Detail satu konten |
| GET | /api/favorites | ✓ | Daftar favorit user |
| POST | /api/favorites/:contentId | ✓ | Tambah ke favorit |
| DELETE | /api/favorites/:contentId | ✓ | Hapus dari favorit |
| GET | /api/activities | ✓ | Daftar catatan aktivitas user |
| POST | /api/activities | ✓ | Tambah catatan aktivitas |
| DELETE | /api/activities/:id | ✓ | Hapus catatan aktivitas |

Endpoint dengan ✓ butuh header `Authorization: Bearer <token>` (token didapat dari hasil register/login).

Kategori konten yang valid: `gizi`, `olahraga`, `kesehatan-mental`, `pencegahan-penyakit`
Tipe konten yang valid: `artikel`, `video`, `infografis`
Tipe aktivitas yang valid: `air-minum`, `olahraga`, `tidur`, `mood`, `berat-badan`

## Menyajikan Web App Juga (Mode Gabungan)
Backend ini otomatis menyajikan hasil build React web app kalau folder `../web/dist` ada. Cukup jalankan `npm run build` di folder `web/` sebelum start backend — lihat `README.md` di folder induk (`healthy-life-app/`) untuk detailnya. Endpoint health-check API sekarang ada di `/api/health` (bukan `/` lagi, karena `/` dipakai untuk web app saat mode gabungan aktif).

## Deploy Gratis
Backend ini bisa di-deploy ke Render, Railway, atau layanan sejenis yang masih ada free tier-nya. Isi environment variable yang sama (MONGO_URI, JWT_SECRET) di dashboard hosting-nya. `PORT` biasanya sudah otomatis diisi oleh platform hosting.

## Catatan
- Password di-hash dengan bcrypt sebelum disimpan, tidak pernah disimpan dalam bentuk teks biasa.
- Konten, favorit, dan aktivitas hanya bisa diakses setelah login (sesuai syarat tugas).
- File `.env` sengaja tidak diikutkan (ada di `.gitignore`) — jangan pernah upload `.env` asli ke GitHub/online storage publik.
