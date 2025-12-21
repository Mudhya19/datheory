# Laravel Proyek Mudhya Dev

Selamat datang di proyek Laravel Anda di direktori utama!

## Informasi Dasar

Proyek ini adalah instalasi fresh dari Laravel versi 12.x dengan semua komponen dasar yang diperlukan untuk pengembangan aplikasi web modern.

## Struktur Direktori Penting

-   `app/` - Tempat kode utama aplikasi berada
-   `config/` - File-file konfigurasi aplikasi
-   `database/` - Migrasi, factory, dan seeder database
-   `public/` - File-file publik termasuk index.php
-   `resources/` - View, asset CSS/JS, dan file mentahan lainnya
-   `routes/` - File-file definisi rute aplikasi
-   `storage/` - File-file penyimpanan sementara dan log
-   `tests/` - File-file pengujian unit dan fitur

## Cara Menjalankan Aplikasi

Untuk menjalankan aplikasi Laravel secara lokal, gunakan perintah berikut dari direktori utama:

```bash
php artisan serve
```

Aplikasi akan tersedia di http://localhost:8000

## Konfigurasi Database

Secara default, aplikasi dikonfigurasi untuk menggunakan SQLite. File database `database.sqlite` sudah dibuat di direktori `database/`.

Jika Anda ingin menggunakan database lain (MySQL, PostgreSQL), ubah konfigurasi di file `.env` sesuai kebutuhan Anda.

## Langkah Berikutnya

-   Sesuaikan konfigurasi di file `.env` sesuai lingkungan Anda
-   Buat model, controller, dan migrasi baru sesuai kebutuhan aplikasi
-   Tambahkan route di `routes/web.php` atau `routes/api.php`
-   Gunakan Artisan CLI untuk bantuan lebih lanjut: `php artisan list`

## Perintah-perintah Umum

-   `php artisan migrate` - Jalankan migrasi database
-   `php artisan db:seed` - Isi data awal ke database
-   `php artisan make:model NamaModel` - Buat model baru
-   `php artisan make:controller NamaController` - Buat controller baru
-   `php artisan cache:clear` - Bersihkan cache
-   `php artisan config:cache` - Cache konfigurasi

Proyek Laravel ini siap digunakan untuk pengembangan aplikasi sesuai kebutuhan Anda!
