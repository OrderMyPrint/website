// Colour-to-alpha against the paper background: keeps anti-aliased edges, drops the paper texture.
const sharp = require(process.argv[4] + "/node_modules/sharp");
(async () => {
  const [src, out] = [process.argv[2], process.argv[3]];
  const { data, info } = await sharp(src).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  // background = median of a 40px border
  const samples = [[], [], []];
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    if (x > 40 && x < w - 40 && y > 40 && y < h - 40) continue;
    const i = (y * w + x) * 3; for (let c = 0; c < 3; c++) samples[c].push(data[i + c]);
  }
  const bg = samples.map((s) => s.sort((a, b) => a - b)[s.length >> 1]);
  const T0 = 0.07, T1 = 0.32; // paper texture sits below T0
  const outBuf = Buffer.alloc(w * h * 4);
  for (let p = 0; p < w * h; p++) {
    const px = [data[p * 3], data[p * 3 + 1], data[p * 3 + 2]];
    let a = 0; for (let c = 0; c < 3; c++) a = Math.max(a, (bg[c] - px[c]) / bg[c]);
    a = Math.min(1, Math.max(0, (a - T0) / (T1 - T0)));
    for (let c = 0; c < 3; c++) {
      // un-mix the paper colour from partially covered edge pixels
      const v = a > 0 ? (px[c] - bg[c] * (1 - a)) / a : 0;
      outBuf[p * 4 + c] = Math.max(0, Math.min(255, Math.round(v)));
    }
    outBuf[p * 4 + 3] = Math.round(a * 255);
  }
  await sharp(outBuf, { raw: { width: w, height: h, channels: 4 } }).trim({ threshold: 1 }).png({ compressionLevel: 9 }).toFile(out);
  console.log("bg", bg.join(","), "->", out);
})();
