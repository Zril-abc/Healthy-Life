# Healthy Life — Web App

Frontend web untuk aplikasi edukasi kesehatan **Healthy Life**, dibangun dengan React (Vite) + Tailwind CSS v4 + React Router.

## Halaman
1. `/register` — Daftar akun
2. `/login` — Masuk
3. `/` — Beranda (feed konten + filter kategori + pencarian)
4. `/content/:id` — Detail konten + tombol simpan favorit
5. `/favorites` — Konten favorit
6. `/activities` — Catatan aktivitas kesehatan harian
7. `/profile` — Profil user + logout

Semua halaman selain register/login dilindungi (`ProtectedRoute`) — otomatis diarahkan ke `/login` kalau belum masuk.

## Cara Menjalankan

1. Pastikan **backend** sudah jalan (lihat README di folder backend), termasuk sudah `npm run seed`.
2. Install dependencies:
   ```
   npm install
   ```
3. Salin `.env.example` ke `.env` bila perlu ubah alamat API (default sudah `http://localhost:5000/api`).
4. Jalankan:
   ```
   npm run dev
   ```
5. Buka `http://localhost:5173`

## Build untuk Deploy
```
npm run build
```
Hasil build ada di folder `dist/`, siap di-deploy ke Vercel/Netlify (gratis). Jangan lupa set environment variable `VITE_API_URL` di dashboard hosting mengarah ke URL backend yang sudah live.

## Struktur Folder
```
src/
├── api/          # pemanggilan ke backend (axios)
├── context/      # AuthContext — state login global
├── components/   # Navbar, ContentCard, ProtectedRoute, dll
└── pages/        # 7 halaman aplikasi
```

## Desain
Warna dan tipografi diatur sebagai design token di `src/index.css` (Tailwind v4 `@theme`). Tiap kategori konten (gizi, olahraga, kesehatan mental, pencegahan penyakit) punya warna sendiri yang konsisten dipakai di badge kategori, filter, dan ikon aktivitas — supaya kategori mudah dikenali sekilas di seluruh aplikasi.
