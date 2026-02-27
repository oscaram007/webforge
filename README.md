# ⚡ WebForge 3.0 — Pro Live Editor

<div align="center">

![WebForge](https://img.shields.io/badge/WebForge-3.0-7c6af7?style=for-the-badge&labelColor=0b0c10)
![Monaco](https://img.shields.io/badge/Monaco_Editor-0.44-5b9cf6?style=for-the-badge&labelColor=0b0c10)
![PWA](https://img.shields.io/badge/PWA-Offline_Ready-3dd68c?style=for-the-badge&labelColor=0b0c10)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge&labelColor=0b0c10)

**A Monaco-powered browser IDE with persistent projects, live preview, TypeScript support, hot CSS reload, and full offline capability.**

[**→ Open the Editor**](https://YOUR_USERNAME.github.io/webforge/)

</div>

---

## ✨ What's in v3.0

| Feature | Details |
|---|---|
| **Persistent Projects** | IndexedDB auto-save every 4 seconds, named project switcher |
| **Shareable URLs** | Full project compressed into a URL hash via LZ-string |
| **Hot CSS Reload** | CSS-only changes patch the iframe without a full reload |
| **TypeScript** | In-browser transpilation via Monaco's TS compiler API |
| **Download as ZIP** | Export all project files as a `.zip` via JSZip |
| **Prettier Formatting** | Lazy-loaded Prettier 3.x for JS, CSS, HTML, TS, JSON, Markdown |
| **CDN Resource Manager** | 20 curated packages toggled directly into the preview |
| **Responsive Tester** | 5 device presets + freeform drag-to-resize with px readout |
| **Console Inspector** | Expandable object/array trees with type-colored values |
| **Command Palette** | Fuzzy-search all actions, files, themes, CDN packages (`Ctrl+K`) |
| **Version History** | In-memory snapshot timeline with diff view |
| **6 Editor Themes** | WebForge, Nord, Monokai, GitHub Light, Solarized, One Dark |
| **PWA / Offline** | Service Worker caches app shell and all CDN assets |

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl+Enter` | Run / refresh preview |
| `Ctrl+K` | Command palette |
| `Ctrl+P` | Projects dropdown |
| `Ctrl+Shift+S` | Share URL (copy to clipboard) |
| `Ctrl+Shift+D` | Download as ZIP |
| `Ctrl+B` | Toggle sidebar |
| `Ctrl+H` | Toggle version history |
| `Ctrl+W` | Close current tab |
| `Ctrl+1..9` | Switch to Nth open tab |
| `Shift+Alt+F` | Format with Prettier |
| `Ctrl+/` | Toggle line comment |
| `Ctrl+Space` | Trigger IntelliSense |
| `Alt+↑/↓` | Move line up/down |
| `Ctrl+D` | Select next occurrence |

---

## 🚀 Getting Started

### Use it online
Visit the [live editor](https://YOUR_USERNAME.github.io/webforge/) — opens instantly, caches for offline after first visit.

### Run it locally
```bash
git clone https://github.com/YOUR_USERNAME/webforge.git
cd webforge

# Serve over HTTP so Service Worker registers properly
python3 -m http.server 8080
# then open http://localhost:8080
```

---

## 🗂️ Project Structure
```
webforge/
├── index.html          # Full application — Monaco IDE, all CSS, all JS
├── sw.js               # Service Worker (offline caching + PWA)
├── manifest.json       # PWA manifest (installable, standalone display)
├── README.md           # This file
├── SETUP.md            # Step-by-step GitHub Pages deploy guide
├── LICENSE             # MIT License
├── .gitignore
└── .github/
    └── workflows/
        └── deploy.yml  # GitHub Actions → GitHub Pages CI/CD
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit: `git commit -m 'feat: add my feature'`
4. Push: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 📄 License

MIT — see [`LICENSE`](LICENSE).

---

<div align="center">

Built with ⚡ Monaco Editor. Zero build tools. Zero dependencies to install.

</div>
