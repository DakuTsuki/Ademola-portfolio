# Ademola Adebayo - Personal Portfolio

A clean, editorial personal portfolio for Ademola Adebayo, a web developer from Nigeria. Built with React, TypeScript, and Tailwind CSS.

## Design Philosophy

- **Editorial & Confident**: Warm paper background (`#FAF9F6`), rich graphite dark mode (`#111112`), and a single strong terracotta accent (`#C84B26`).
- **Typography**: Paired Google Fonts: *Newsreader* (optical sizing editorial serif for headings) and *Plus Jakarta Sans* (modern grotesque sans for body), with *JetBrains Mono* for technical metadata.
- **Zero AI Cliches**: No purple-blue gradients, no glassmorphism, no floating blobs, and no em dashes.
- **Honest Writing**: Direct first-person voice without buzzwords.

---

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open your browser to `http://localhost:3000`.

### 3. Build for Production
```bash
npm run build
```
The output will be in the `dist/` directory ready for deployment to Vercel or cPanel.

---

## Customizing Your Content

All data is intentionally consolidated into a single file so you can update anything without touching React components:

📁 **`src/data/portfolioData.ts`**
- **Personal Details**: Name, headline, about paragraph, location.
- **Contact**: Email, phone, LinkedIn, and GitHub links.
- **Skills**: Add or reorder skills in the grouped categories.
- **Projects**: Add new projects, change descriptions, or provide direct code repo links.

### Swapping Your Photo
Place your real photo at:
```text
src/assets/ademola.jpg
```
The hero section automatically detects the image. If the placeholder is active, it renders an architectural monogram slot until you replace the file.

### Uploading Your CV
Place your curriculum vitae PDF at:
```text
public/ademola-adebayo-cv.pdf
```
The "Download CV" buttons in the header and contact section link directly to this file.

### Replacing Project Screenshots
By default, screenshots are automatically generated from live URLs using WordPress mshots. If you prefer to use your own screenshot for any project:
1. Save your screenshot in `public/projects/project-name.jpg`
2. In `src/data/portfolioData.ts`, set `imageOverride: "/projects/project-name.jpg"`

---

## Deployment

### Vercel
1. Push this repository to GitHub (`https://github.com/DakuTsuki/...`).
2. Log into [Vercel](https://vercel.com) and click **Add New Project**.
3. Select your repo. Vercel automatically detects Vite and runs `npm run build`.

### cPanel
1. Run `npm run build` locally.
2. Upload the contents of the generated `dist/` folder to your cPanel `public_html` directory (or subdomain folder).
