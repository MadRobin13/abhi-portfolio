# Apply the recognitions and media correction update

Requires the immediately previous restored-sidebar portfolio source at `~/Documents/code/github/abhi-portfolio` or a compatible later version. Back up local changes first.

```sh
cd ~/Documents/code/github/abhi-portfolio
git status
unzip -o ~/Downloads/ABHI_PORTFOLIO_RECOGNITIONS_MEDIA_UPDATE_ONLY.zip -d .
sh scripts/cleanup-retired-media.sh
npm ci
npm run lint
npm test
npm run build
git status
git diff --stat
git add -A
git commit -m "Rotate recognitions and correct project media allocation"
git push origin main
```

The cleanup script only deletes known, obsolete media files listed in the change log. It does not touch FRC/Muse/PET/Strobe/TRIGR authentic media retained in galleries. If your repository has advanced beyond the restored-sidebar version, review the diff before committing.

**Limitation:** DVD Pong and Soap READMEs do not embed GIF assets. Verified repository image files were added as supporting media instead, but the DVD Pong GIF has not been installed. Do not label this as completed.
