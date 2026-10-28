# PaperDesk download site

A simple static download page for PaperDesk. No build step, no external fonts, no tracking scripts.

- Live site: https://superbigvro.github.io/pd-7c4e9a21f3/
- Unlisted repository: https://github.com/Superbigvro/pd-7c4e9a21f3
- Installer release: https://github.com/Superbigvro/pd-7c4e9a21f3/releases/tag/v0.1.0

## Link-only access

GitHub Free cannot restrict a Pages site or anonymous release downloads to a private audience. This page is unlisted instead: the URL is hard to guess, `robots.txt` disallows crawlers, and the page sends `noindex, nofollow`. Anyone with the URL can download the installer, so treat the link as the access key and do not post it publicly.

## Preview locally

Open `index.html` directly, or serve the folder:

```powershell
python -m http.server 8080 --directory website
```

Then visit `http://localhost:8080`.

## Files

- `index.html` — the landing page.
- `styles.css` — plain layout and responsive styles.
- `site.js` — download link, version, file size, checksum, copy button, and footer year.
- `assets/` — app icon and source screenshots (not embedded on the page).
- `downloads/PaperDesk-Setup-0.1.0.exe` — the current Windows installer.

## Update the download

1. Copy the new installer into `downloads/`.
2. Update `version`, `size`, `downloadUrl`, and `sha256` at the top of `site.js`.
3. Update the visible checksum in `index.html` if you want it to be present without JavaScript.
4. Replace the version text in `index.html` if the filename changes.

The live page reads `downloadUrl` from `site.js`. The published site points at the GitHub release asset:

```js
downloadUrl: 'https://github.com/Superbigvro/pd-7c4e9a21f3/releases/latest/download/PaperDesk-Setup-0.1.0.exe'
```

For a self-contained upload, it can instead use a relative path:

```js
downloadUrl: 'downloads/PaperDesk-Setup-0.1.0.exe'
```

The button links in `index.html` also point at the release URL as a no-JavaScript fallback.

## Publishing

Any static host works. The folder is already ready to upload.

### Recommended: GitHub Pages + a release asset

GitHub Pages has a 100 MB per-file limit, so keep the 121 MB installer in a **GitHub Release** rather than the Pages branch.

1. Create a public repository for the site.
2. Push `index.html`, `styles.css`, `site.js`, `assets/`, `site.webmanifest`, and `favicon.ico`. Do not commit the `downloads/` folder.
3. Create a release (for example `v0.1.0`) and upload the installer as `PaperDesk-Setup.exe`.
4. Set `downloadUrl` in `site.js` to:
   `https://github.com/OWNER/REPO/releases/latest/download/PaperDesk-Setup.exe`
5. In the repository settings, enable **Pages** from the branch root.
6. Open `https://OWNER.github.io/REPO/`.

### Other hosts

- **Cloudflare Drop** — no account needed to preview; claim the deployment within the claim window if you want to keep it. Make sure the host accepts the installer size, or link the installer from a release/file host.
- **Netlify Drop** — drag the folder onto the drop page; check its current per-file limit before uploading the installer.
- **Any web server/FTP** — upload the contents of this folder. The page is plain static HTML/CSS/JS.

## The installer is unsigned

The current Windows build is not code-signed, so SmartScreen can show a warning. The page explains this in the download section. Keep that note unless you sign future builds.

## License

PaperDesk is released under the Apache License 2.0. See `LICENSE`.

## Credits

PaperDesk was built and imagined by **zlooocz (superbigvro)**.
