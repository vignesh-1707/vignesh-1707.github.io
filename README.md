# Vignesh M — Portfolio

A React + Vite portfolio built with a terminal/developer aesthetic.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🛠 Build for Production

```bash
npm run build
```

Output goes to the `dist/` folder — ready to deploy to GitHub Pages, Vercel, or Netlify.

## 📦 Deploy to GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
# "deploy": "npm run build && gh-pages -d dist"

# Add this to vite.config.js:
# base: '/your-repo-name/'

npm run deploy
```

## 🎨 Customization

- **Colors** — Edit CSS variables in `src/index.css`
- **Content** — Edit the `DATA` section at the top of `src/App.jsx`
- **Sections** — Each section is a standalone component in `App.jsx`

## Tech Stack

- React 18
- Vite 4
- Lucide React (icons)
- Google Fonts (Syne, Fira Code, Outfit)
