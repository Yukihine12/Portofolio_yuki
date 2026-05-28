```markdown
# Project Context: Developer Portfolio

## Persona & Background
- **Developer Name:** Muqtada Hasby Abdalla 
- **Role:** Cloud, Backend, and Data Engineer 
- **Current Status:** Final-year Informatics Engineering student at UIN Sunan Gunung Djati Bandung[cite: 15]. Graduate of Bangkit Academy (Cloud Computing) and Certified International Specialist in Data Engineering (CISDE).

## Technical Stack
- **Frontend:** React.js
- **Backend:** Express.js (Node.js)
- **Database:** Supabase PostgreSQL 
- **Storage:** Supabase Storage (for images and certificates)
- **Data Source:** Static resume data is managed via local Markdown (.md) files with Frontmatter in `backend/content/`.

## Architecture & File Structure
```text
/my-portfolio
├── context.md            # (This file)
├── 📁 frontend/          # React App
└── 📁 backend/           # Express Server
    ├── server.js
    └── 📁 content/       # Single Source of Truth (.md files)
        ├── profile.md
        ├── skills.md
        ├── projects.md
        ├── education.md
        └── certifications.md

```

## UI/UX & Design Guidelines

1. **Intro / Entrance Animation:** Kombinasi warna dominan hitam + *navy blue* (biru dongker) dengan aksen *tech/cyberpunk*. Ada animasi nama di awal sebelum masuk ke halaman utama.
2. **Main Page Layout:** - Kiri: Teks Summary, Quote, dan Sosial Media (LinkedIn, GitHub, Instagram) menggunakan icon SVG dari Simple Icons / Iconify.
* Kanan: Foto profil (Avatar).
3. **About Me Section:** Penjelasan profil profesional yang diletakkan di bawah halaman utama, dilengkapi tombol untuk download dokumen CV.
4. **Interactive Tabbing System:** Bagian bawah *About Me* menggunakan sistem tab yang ringkas untuk berpindah kategori konten:
**Education:** Riwayat formal & non-formal.
**Skills:** Grid untuk menampilkan keahlian cloud, backend, dan database.
**Projects:** Menampilkan card project. Project yang belum selesai tetap ditampilkan dengan badge khusus berwarna kuning/oranye bertuliskan **"In Progress"** (contoh: Thesis Microservices).
**Certifications:** Grid berisi card sertifikat (CISDE, CCNA, dll)  yang jika diklik akan membuka modal berisi gambar sertifikat dari Supabase Storage.

5. **Contact Me:** Form pengiriman pesan (bisa ke WhatsApp/Email) dan fitur **Guestbook** (Pesan dari pengunjung). *Note untuk Backend: Fitur Guestbook wajib memiliki kolom moderasi `is_approved (boolean)` di database untuk mencegah spam/abuse.*

## Rules for AI Agent

* Kamu bertindak sebagai AI pair-programmer yang membantu dalam sesi *vibe coding*.
* Selalu tulis kode yang clean, modular, dan berikan error handling yang baik (terutama saat parsing file markdown di backend).
* Ikuti struktur folder dan spesifikasi fitur yang sudah ditentukan di atas.

```

---

### Cara Pake `context.md` Ini di Antigravity:

Setelah kamu bikin file ini di VS Code, kamu tinggal colek agent-nya lewat chat dengan pesan simpel seperti ini:

> *"Tolong baca file `context.md` yang ada di root folder ini sebagai acuan utama seluruh project portofolio kita. Jangan buat kode di luar spesifikasi yang ada di file tersebut ya."*

Dengan begini, si agent bakal punya "otak" yang sama dengan rencana kita dari awal. Langkah `context.md` ini udah oke? Kalau udah, silakan dibuat filenya, lalu kabari aku kalau kamu udah siap buat nyuruh agent-nya eksekusi kode `server.js` pertama tadi!

```