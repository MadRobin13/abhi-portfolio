# Intro once per tab session

The ASCII loading intro now runs on the first homepage visit in each tab session, then is bypassed on subsequent homepage visits and reloads in that tab. Navigating from the About page back to Home no longer restarts the intro. A new browser tab or session can show it again.

The flag is established in an inline script in the document head before styles load, preventing even a brief flash of the intro on return. If storage is disabled, the existing intro and automatic timeout remain as a safe fallback. The previous full reveal timing and subtle Skip intro link are otherwise unchanged.

The implementation modifies `index.html`, `assets/upgrade.css`, `assets/media-explorer.js`, `tests/final-polish.cjs`, `package.json` and adds `tests/intro-once.cjs`.
