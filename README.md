# Raushan Singh | Personal Portfolio

This repository contains the source code for my personal portfolio website. It serves as a centralized hub for my resume, software engineering experience, technical skills, and project showcases.

### 🌐 Live Website: [raushansingh.com](https://raushansingh.com)

---

## 💻 Tech Stack & Architecture
- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: SCSS / CSS
- **Deployment**: Automated via GitHub Actions directly to GitHub Pages
- **Data Management**: Component data, timelines, and static content are heavily decoupled into independent JSON configuration files (found in `public/data/`).

---

## 🚀 Local Development

If you'd like to run this project locally to explore the architecture or run a development server:

**1. Clone the repository**
```bash
git clone https://github.com/raushansinghdev/portfolio-site.git
cd portfolio-site
```

**2. Install dependencies**
```bash
npm install
```

**3. Start the development server**
```bash
npm run dev
```

The application will launch typically at `http://localhost:5173`.

---

## 📦 Deployment Workflow
This project utilizes a continuous deployment setup via GitHub Actions. Any code merged into the `main` branch automatically triggers the `.github/workflows/deploy.yml` pipeline. This pipeline securely provisions an environment, builds the static Vite bundle, and publishes it to GitHub Pages.

---

> _This portfolio was originally adapted from the React Portfolio Template by ryanbalieiro before being heavily customized and optimized._