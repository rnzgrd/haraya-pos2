# Haraya POS: install and set up

The app is a set of plain files. The iPad loads them once from a web address, then runs from the
Home Screen with no internet. Your sales data stays on the iPad (plus Google Drive if you turn on cloud backup).

## 1. Put the files online (free, one time)

1. Make a free GitHub account and a new **public** repository, e.g. `haraya-pos`.
2. Upload `index.html`, `sw.js`, `manifest.webmanifest` and the three `icon-*.png` files.
3. Repo **Settings → Pages**: Branch `main`, folder `/ (root)`, then click Save.
4. After a minute the app is at `https://<your-username>.github.io/haraya-pos/`.

## 2. Install on the iPad

1. Open that address in **Safari** while online.
2. **Share → Add to Home Screen → Add**.
3. Always open it from the Home Screen icon. Don't delete the icon: deleting it deletes its data.

## 3. Before opening day

- **Setup → PIN & backup → Set PIN.** Money, Allocate, Payback, Setup, voids and stock counts then need it.
- **Setup → Supplies:** real pack sizes and prices (anything marked "Not set").
- **Setup → Menu:** real recipes per cup.
- **Setup → Running costs:** barista pay and rent are already in. Add anything else.
- **Stock → Count** each supply.
- If you tried the sample sales: **Setup → PIN & backup → Remove samples**.

## 4. Cloud backup (optional, recommended)

1. Go to script.google.com → **New project**. Paste in `google-apps-script.js` and change `SECRET_KEY`.
2. **Deploy → New deployment → Web app**. Execute as: **Me**. Who has access: **Anyone**. Deploy, approve access,
   and copy the web app URL (ends in `/exec`).
3. In the app: **Setup → PIN & backup → Cloud backup**. Paste the URL and the key, then tap **Save** and **Send now**.
4. Check your Google Drive for a **Haraya POS backups** folder.

After that, the iPad sends a backup by itself when you close a shift, and whenever it's online with new changes
(at most every 30 minutes). On the Mac, open the same app address, enter the same URL and key, and tap **Load latest**.

## Daily routine

1. **Open shift:** count the starting cash.
2. Take orders. GCash/Maya need the reference number. Use **Free** for staff drinks, promos and remakes.
3. Log spills and spoiled stock in **Stock → Log waste**.
4. **Orders → Close shift and count cash.** The app shows what should be in the drawer, today's profit and a suggested split.
5. Weekly: **Allocate** shows where the week's money should go. **Deposit** the payback share. **Payback** tracks progress to your 50% goal.

## Updating the app later

Replace `index.html` in the repo and change the version in `sw.js` (`haraya-pos-v2` → `v3`).
The iPad picks it up the next time it opens online. Your data stays.
