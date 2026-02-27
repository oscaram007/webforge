# 🛠️ Setup Guide — Publishing WebForge 3.0 to GitHub Pages

> This is a zero-build-tool project. There is nothing to install or compile.
> The entire app is a single `index.html` file. Push to GitHub and it's live.

---

## Prerequisites

- A [GitHub account](https://github.com/signup)
- [Git installed](https://git-scm.com/downloads)
- A terminal

---

## Step 1 — Create a GitHub Repository

1. Go to **https://github.com/new**
2. Name: `webforge` (or any name you prefer)
3. Visibility: ✅ **Public** (required for free GitHub Pages)
4. Leave all checkboxes unchecked
5. Click **Create repository**
6. Copy the repo URL shown: `https://github.com/YOUR_USERNAME/webforge.git`

---

## Step 2 — Update Placeholders

**`README.md`** — replace `YOUR_USERNAME` (2 places):
```
https://YOUR_USERNAME.github.io/webforge/
https://github.com/YOUR_USERNAME/webforge.git
```

**`LICENSE`** — replace `YOUR_NAME` with your real name.

---

## Step 3 — Push to GitHub
```bash
git init
git add .
git commit -m "feat: WebForge 3.0 — persistent projects, share URLs, hot CSS reload"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/webforge.git
git push -u origin main
```

---

## Step 4 — Enable GitHub Pages

1. Go to your repo on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Source**, select **GitHub Actions**
4. The workflow runs automatically on every push to `main`
5. Check the **Actions** tab to watch the deploy (~60 seconds)

Your editor will be live at:
```
https://YOUR_USERNAME.github.io/webforge/
```

---

## Local Development
```bash
# Python (built-in)
python3 -m http.server 8080

# Node.js
npx serve .
```

Then open `http://localhost:8080`.

---

## Updating
```bash
git add .
git commit -m "feat: describe your change"
git push
# → GitHub Actions redeploys automatically (~60 seconds)
```

---

## Troubleshooting

| Problem | Fix |
|---|---|
| PWA badge not showing | Must be served over HTTPS or localhost, not `file://` |
| Old version showing after update | Hard refresh: `Ctrl+Shift+R` |
| Monaco not loading | CDN required on first load — check internet connection |
| 404 on GitHub Pages URL | Wait 2–3 mins after first push; check the Actions tab |
| Pages settings missing | Ensure repository is set to **Public** |
| IndexedDB not persisting | Some browsers block IndexedDB in private/incognito mode |
