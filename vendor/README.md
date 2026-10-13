# Third-party code

`libheif.js` and `libheif.wasm` are taken unmodified from [libheif-js](https://github.com/catdad-experiments/libheif-js) 1.23.5 (`libheif-wasm/`). They contain [libheif](https://github.com/strukturag/libheif) and [libde265](https://github.com/strukturag/libde265), both licensed under the GNU Lesser General Public License v3. The license text is in `LICENSE-libheif`, and the source code is available at the links above.

Both files are loaded as separate files by `heic-worker.js` and can be replaced with another build of libheif-js.
