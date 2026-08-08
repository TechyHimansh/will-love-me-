# ❤️ Love Quiz

A small romantic interactive quiz designed for GitHub Pages.

## Files

- `index.html` — page structure
- `style.css` — design and animations
- `script.js` — quiz logic and response collection

## Deploy on GitHub Pages

1. Create a new GitHub repository.
2. Upload these three files.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose:
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/ (root)**
5. Save and wait for GitHub Pages to publish.

Your URL will look like:

`https://YOUR-USERNAME.github.io/REPOSITORY-NAME/`

## Get responses by email

GitHub Pages itself cannot securely send email because it is static hosting.

The easiest option is Formspree:

1. Create a free form at Formspree.
2. Copy your form endpoint.
3. Open `script.js`.
4. Replace:

`YOUR_FORMSPREE_ENDPOINT`

with your Formspree endpoint.

Example:

`const FORMSPREE_ENDPOINT = "https://formspree.io/f/xxxxxxxx";`

Every answer will then be submitted to your Formspree form and can be emailed to you.

## Privacy note

Do not put a GitHub personal access token, email password, SMTP password, or API secret inside this frontend code. Anything in a GitHub Pages website is publicly visible.
