# Healthy Life

**Healthy Life** adalah platform edukasi kesehatan bagi masyarakat — tersedia sebagai aplikasi **web** dan **mobile** dengan tampilan serta alur yang konsisten di keduanya. Aplikasi menyediakan artikel, video, dan infografis seputar pola hidup sehat, dan membantu pengguna memantau kebiasaan sehatnya sendiri.

##  Fitur

| Fitur | Keterangan |
|---|---|
| 🔐 Registrasi & Login | Autentikasi akun berbasis JWT, password ter-enkripsi (bcrypt) |
| 📚 Jelajahi Konten | Artikel, video, infografis — bisa difilter per kategori & dicari judulnya |
| 📖 Detail Konten | Baca isi lengkap tiap konten |
| ⭐ Favorit | Simpan konten untuk dibaca lagi nanti |
| 📝 Catatan Aktivitas | Catat kebiasaan sehat harian: air minum, olahraga, tidur, mood, berat badan |
| 👤 Profil | Kelola info akun & logout |

Seluruh fitur dan konten **hanya bisa diakses setelah registrasi/login**, sesuai ketentuan tugas.

##  Kategori Konten

| Kategori | Tentang |
|---|---|
| 🥗 Gizi Seimbang | Pola makan sehat dan bergizi |
| 🏃 Olahraga | Aktivitas fisik dan kebugaran |
| 🧠 Kesehatan Mental | Manajemen stres dan kesejahteraan psikologis |
| 🛡️ Pencegahan Penyakit | Langkah menjaga tubuh dari penyakit |

##  Arsitektur

```
                MongoDB
                   ▲
                   │
               backend/            Node.js + Express + JWT
          (satu-satunya yang       (satu-satunya bagian yang
           connect ke MongoDB)      pegang MONGO_URI)
                   ▲
                   │  REST API (HTTP/JSON)
          ┌────────┴────────┐
          │                 │
        web/              mobile/
   React + Vite      React Native (Expo)
```

`web/` dan `mobile/` **tidak pernah** mengakses database secara langsung — keduanya cuma bicara ke `backend/` lewat REST API. Kredensial database hanya hidup di `backend/.env`, tidak pernah terkirim ke browser maupun aplikasi mobile.

##  Struktur Project

```
healthy-life-app/
├── .github/workflows/   # CI — cek otomatis install & build tiap push
├── backend/              # Node.js + Express + MongoDB (REST API)
├── web/                  # React (Vite) — aplikasi web, 7 halaman
├── mobile/                # React Native (Expo) — aplikasi mobile, 7 layar
├── docs/                  # Dokumentasi tugas (Word) — isi screenshot & link di sini
└── package.json           # Script kemudahan di root
```

Tiap folder (`backend/`, `web/`, `mobile/`) punya `README.md` sendiri dengan instruksi & detail lengkap.

##  Menjalankan Aplikasi

**A. Terpisah** (paling nyaman untuk development — web dapat hot-reload cepat):
```bash
cd backend && npm install && npm run dev     # http://localhost:5000
cd web && npm install && npm run dev         # http://localhost:5173
```

**B. Digabung jadi satu server** (disarankan saat submit tugas / deploy):
```bash
cd web && npm install && npm run build
cd ../backend && npm install && npm run dev  # http://localhost:5000 sajikan API + web
```

**Mobile:**
```bash
cd mobile && npm install && npx expo start
```
Scan QR dengan **Expo Go**. Perhatikan: `localhost` tidak berfungsi kalau tes di HP fisik — lihat `mobile/README.md` untuk cara pakai alamat IP yang benar.

##  API Singkat

| Grup | Endpoint | Auth |
|---|---|---|
| Auth | `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me` | sebagian |
| Konten | `GET /api/content`, `GET /api/content/:id` | ✓ |
| Favorit | `GET/POST/DELETE /api/favorites` | ✓ |
| Aktivitas | `GET/POST/DELETE /api/activities` | ✓ |

Detail lengkap tiap endpoint ada di `backend/README.md`.

##  Teknologi

| Bagian | Teknologi |
|---|---|
| Backend | Node.js, Express, MongoDB (Mongoose), JWT |
| Web | React (Vite), Tailwind CSS, React Router |
| Mobile | React Native (Expo), React Navigation |

##  Push ke GitHub

Dari dalam folder `healthy-life-app/` (setelah extract zip):
```bash
git init
git add .
git commit -m "Initial commit - Healthy Life app"
git branch -M main
git remote add origin <url-repo-github-kamu>
git push -u origin main
```
`.gitignore` sudah mencakup `node_modules`, `.env`, hasil build, dan file Expo — yang ke-push cuma source code bersih.
