// Converts HEIC files to JPEG for browsers that cannot show HEIC themselves.
importScripts('vendor/libheif.js');

const ready = new Promise(resolve => {
  libheif({
    locateFile: file => 'vendor/' + file,
    onRuntimeInitialized() { resolve(this); },
  });
});

onmessage = async ({ data: { buffer, maxSize } }) => {
  try {
    const lib = await ready;
    const images = new lib.HeifDecoder().decode(new Uint8Array(buffer));
    if (!images.length) throw new Error('Not a HEIC image');
    const image = images[0];
    const w = image.get_width(), h = image.get_height();
    const pixels = await new Promise((resolve, reject) => {
      image.display({ data: new Uint8ClampedArray(w * h * 4), width: w, height: h }, d => d ? resolve(d) : reject(new Error('Could not decode HEIC')));
    });
    images.forEach(i => i.free());

    const full = new OffscreenCanvas(w, h);
    full.getContext('2d').putImageData(new ImageData(pixels.data, w, h), 0, 0);
    const scale = Math.min(1, maxSize / Math.max(w, h));
    let out = full;
    if (scale < 1) {
      out = new OffscreenCanvas(Math.round(w * scale), Math.round(h * scale));
      out.getContext('2d').drawImage(full, 0, 0, out.width, out.height);
    }
    postMessage({ blob: await out.convertToBlob({ type: 'image/jpeg', quality: 0.92 }) });
  } catch (e) {
    postMessage({ error: String(e.message || e) });
  }
};
