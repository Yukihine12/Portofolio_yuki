# 🚀 Personal Portfolio & Headless CMS Website
[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://muqtada-hasby-abdalla.my.id)
[![React](https://img.shields.io/badge/frontend-React%20%2B%20Vite-blue)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/backend-Node.js%20%2B%20Express-green)](https://nodejs.org/)
[![Supabase](https://img.shields.io/badge/database-Supabase-darkgreen)](https://supabase.com/)

A modern, high-performance personal portfolio website built using a Monorepo architecture. This project features a Headless CMS approach leveraging static Markdown files for dynamic rendering, secured via automated CI/CD pipelines.

🌐 **Live Website:** [muqtada-hasby-abdalla.my.id](https://muqtada-hasby-abdalla.my.id)

---
## 🛠️ Tech Stack & Architecture

### Frontend (`/FE`)
- **Core:** React.js + Vite (for lightning-fast development and build times)
- **Content Parsing:** `gray-matter` (to parse metadata from static Markdown files)
- **Deployment:** GitHub Pages via Custom GitHub Actions

### Backend (`/BE`)
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database / BaaS:** Supabase (PostgreSQL)

---
## 💡 Key Features

- **Headless CMS Approach:** Content (experiences, profiles, projects) is managed via structured Markdown files (`.md`) using Front-Matter.
- **Secure Credentials:** Frontend credentials (`VITE_SUPABASE_ANON_KEY`) are dynamically injected during production builds using **GitHub Secrets**, adhering to industry security standards.
- **Automated CI/CD Pipeline:** Integrated with GitHub Actions to automate linting, building, and deploying upon pushing to the `main` branch.
- **Custom Domain & SSL:** Configured with custom DNS mapping (A & CNAME Records) integrated with TLS/HTTPS enforcement.

---

## 📁 Project Structure

```text
├── BE/                      # Backend Directory (Node.js + Express)
│   ├── content/             # Markdown content files (.md)
│   ├── server.js            # Express server entry point
│   └── package.json
├── FE/                      # Frontend Directory (React + Vite)
│   ├── .github/workflows/   # CI/CD Deployment configurations
│   ├── src/                 # React components and logic
│   ├── public/              # Static assets
│   └── package.json
├── .nojekyll                # Bypasses Jekyll processing on GitHub Pages
└── README.md

🚀 Getting Started (Local Development)
Prerequisites
Make sure you have Node.js and npm installed on your machine.

1. Clone the Repository
git clone [https://github.com/Yukihine12/Portofolio_yuki.git](https://github.com/Yukihine12/Portofolio_yuki.git)
cd Portofolio_yuki

2. Setup Backend
cd BE
npm install
# Create a .env file and add your Supabase credentials
npm start

3. Setup Frontend
cd ../FE
npm install
# Create a .env file and add: VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY
npm run dev

The frontend deployment is fully automated using GitHub Actions (deploy.yml). On every push to the main branch, the workflow runner:
Sets up the Node.js environment.
Installs frontend dependencies.
Injects production environment variables from GitHub Secrets.
Generates static assets using Vite (npm run build).
Injects the custom domain CNAME into the build directory.
Deploys the static bundle straight to GitHub Pages.

👨‍💻 Developed by Muqtada Hasby Abdalla
-- Feel free to ask me anything about this project
