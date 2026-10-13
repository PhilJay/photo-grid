# Photo Grid

Arrange photos from a folder into printable A4 pages, add notes, and export each page as a JPG plus a zip. Runs in the browser, works offline, and photos never leave your computer.

## Use

Open the page, click "Choose photo folder…" and pick a folder with photos. Drag photos to reorder them. In Chrome or Edge the order, hidden photos, notes and settings are saved as `photo-grid.json` inside that folder, and exports go into an `export` folder next to the photos. Safari and Firefox keep the arrangement in the browser and download the export as a zip.

HEIC photos are converted in the browser with [libheif](https://github.com/strukturag/libheif) (`vendor/`, LGPL).

## Run locally

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Publish

Enable GitHub Pages for the `main` branch. After the first visit the app also works offline.
