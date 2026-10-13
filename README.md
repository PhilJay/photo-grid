# Photo Grid

Arrange photos from a folder into printable A4 pages, add notes, and export each page as a JPG plus a zip. Runs in the browser, works offline, and photos never leave your computer.

## Use

Open the page, click "Choose photo folder…" and pick a folder with photos. Drag photos to reorder them. A folder can hold several named projects, each with its own order, notes and settings.

Everything is saved in `photo-grid.json` inside the photo folder, and exports go into `export/<project>/` there. The browser only remembers which folder was opened last. Chrome and Edge write these files directly; in Safari and Firefox you download `photo-grid.json` and put it into the folder yourself, and the export downloads as a zip.

HEIC photos are converted in the browser with [libheif](https://github.com/strukturag/libheif) (`vendor/`, LGPL).

## Run locally

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Publish

Enable GitHub Pages for the `main` branch. After the first visit the app also works offline.
