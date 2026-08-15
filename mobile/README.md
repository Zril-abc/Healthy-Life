# Healthy Life — Mobile App (Expo)

Aplikasi mobile edukasi kesehatan **Healthy Life**, dibangun dengan React Native + Expo, React Navigation (bottom tabs + stack), dan AsyncStorage untuk sesi login.

## Layar
1. Login / Register (stack terpisah, tampil kalau belum login)
2. **Beranda** — feed konten + filter kategori + pencarian (tab)
3. **Detail Konten** — isi lengkap + tombol simpan favorit (dibuka dari Beranda/Favorit)
4. **Favorit** — konten tersimpan (tab)
5. **Aktivitas** — catat aktivitas kesehatan harian (tab)
6. **Profil** — info akun + logout (tab)

Desain (warna, kategori) sengaja disamakan dengan versi web supaya identitas aplikasi konsisten di kedua platform.

## Cara Menjalankan

1. Pastikan **backend** sudah jalan dan bisa diakses (lihat README folder backend).
2. Install dependencies:
   ```
   npm install
   ```
3. **Penting** — atur alamat API di `.env`:
   - Kalau jalan di **emulator Android**: `http://10.0.2.2:5000/api`
   - Kalau jalan di **HP fisik lewat Expo Go**: pakai alamat IP komputer di jaringan WiFi yang sama, misalnya `http://192.168.1.10:5000/api` (cek IP dengan `ipconfig` di Windows atau `ifconfig`/`ip a` di Mac/Linux). **`localhost` tidak akan berfungsi di HP fisik.**
   - Kalau backend sudah di-deploy online, tinggal pakai URL deploy-nya, misal `https://nama-app.onrender.com/api`
4. Jalankan:
   ```
   npx expo start
   ```
5. Scan QR code yang muncul pakai aplikasi **Expo Go** (Android/iOS) — sesuai anjuran di soal tugas.

## Struktur Folder
```
src/
├── theme/colors.js   # design token warna, sama seperti web
├── api/               # pemanggilan ke backend (axios)
├── context/           # AuthContext — state login global
├── navigation/         # RootNavigator, AuthNavigator, MainTabs (bottom tabs)
├── components/         # CategoryBadge, ContentCard, EmptyState
└── screens/            # 7 layar aplikasi
```

## Catatan
- Sudah diuji lolos bundling Metro untuk platform Android tanpa error (`npx expo export --platform android`).
- Kalau mau dapat APK sungguhan (bukan cuma lewat Expo Go), bisa pakai `eas build -p android --profile preview` (perlu akun Expo, prosesnya lebih lama) — tapi soal tugas sudah menyebutkan QR dari Expo Go sebagai opsi yang disarankan, jadi ini tidak wajib.
- Jaringan sandbox yang dipakai untuk membuat project ini tidak bisa mengakses server pengecekan versi Expo (`expo install` gagal), jadi package di-install lewat `npm install` biasa. Disarankan sesekali jalankan `npx expo install --check` di komputer sendiri untuk memastikan semua versi tetap sinkron dengan Expo SDK.
