# Kalpana Verma | Developer Portfolio

A premium, responsive, dark-themed portfolio built with **HTML5, CSS3 and Vanilla JavaScript**.
No backend, no API keys, no paid hosting. It runs perfectly on **GitHub Pages**.

## Project structure

```
kalpana-portfolio/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── images/
    │   ├── kalpana-profile.jpg
    │   └── kalpana-profile.webp
    ├── icons/
    │   ├── favicon.png
    │   └── apple-touch-icon.png
    ├── resume/
    │   └── Kalpana_Verma_Resume.pdf
    └── certificates/
        ├── ai-literacy-ibm-skillsbuild.pdf
        └── ai-literacy-preview.jpg
```

## Step 1: Add your real links (2 minutes)

Open **script.js** and fill in `SITE_CONFIG` at the top:

```js
github: "https://github.com/your-username",
linkedin: "https://www.linkedin.com/in/your-profile",
repoSmartOffice: "https://github.com/your-username/ai-smart-office-assistant",
demoSmartOffice: "",   // only add when a WORKING live demo exists
```

Empty links never lead to a broken page. The button shows a small notice, and the Live Demo button stays hidden until you add a demo URL.

**Adding your COPA / ADCA certificates:** put the PDF or image in `assets/certificates/`, then set
`certCopa: "assets/certificates/your-file.pdf"` (and `certAdca`).

## Step 2: Contact form

By default the form opens the visitor's email app with the message pre-filled. It needs no setup and no backend.
To receive messages directly, create a free form at [formspree.io](https://formspree.io) and paste the endpoint into `formEndpoint` in `script.js`.

## Step 3: Deploy on GitHub Pages

1. **Create a repository.** Sign in at github.com, click **+ → New repository**. Name it `kalpana-portfolio`
   (or `YOUR-USERNAME.github.io` for a cleaner URL). Choose **Public** and click **Create repository**.
2. **Upload the files.** On the new repository page click **uploading an existing file**. Unzip the project,
   open the folder, and drag in **everything inside it** (`index.html`, `style.css`, `script.js`, `README.md` and the
   `assets` folder) so that `index.html` sits at the top level of the repository. Click **Commit changes**.
3. **Enable GitHub Pages.** Go to **Settings → Pages**.
4. **Select the branch.** Under *Build and deployment*, set **Source** to **Deploy from a branch**,
   choose branch **main** and folder **/ (root)**, then click **Save**.
5. **Publish.** Wait 1 to 3 minutes. Refresh the Pages settings page until it says *"Your site is live at …"*.
6. **Get your URL.** It will be `https://YOUR-USERNAME.github.io/kalpana-portfolio/`
   (or `https://YOUR-USERNAME.github.io/` if you used the special repository name).
   Add this link to your resume and LinkedIn.

### Updating the site later
Edit a file on GitHub (pencil icon) or upload a new version, then commit. The site updates in about a minute.

## Troubleshooting

- **Page shows 404:** make sure `index.html` is at the repository's top level, not inside another folder.
- **Images missing:** file names are case-sensitive on GitHub. Keep them exactly as in the structure above.
- **Changes not showing:** hard refresh with `Ctrl + Shift + R`.

## Tech notes

- Mobile-first responsive layout, tested breakpoints at 640 / 860 / 1024 px
- Semantic HTML, skip link, ARIA labels, keyboard-friendly menu and lightbox, `prefers-reduced-motion` support
- Optimized images (WebP with JPG fallback), lazy-loaded certificate preview
- All paths are relative, so it works under a GitHub Pages sub-path
- Icons from Font Awesome and fonts from Google Fonts (both via CDN; visitors need internet)
