/* Generates the PWA icons — the centre mark on the accent ground.
   Hand-rolled PNG writer so the project keeps zero image dependencies. */

import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(here, "..", "public");

const GROUND = [13, 84, 80]; // --accent
const MARK = [240, 196, 112]; // a lighter --mid, for contrast on the ground

const crcTable = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();

const crc32 = (buf) => {
  let c = -1;
  for (const b of buf) c = crcTable[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
};

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

function png(width, height, rgba) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // truecolour with alpha
  const raw = Buffer.alloc((width * 4 + 1) * height);
  for (let y = 0; y < height; y++) {
    raw[y * (width * 4 + 1)] = 0; // filter: none
    rgba.copy(raw, y * (width * 4 + 1) + 1, y * width * 4, (y + 1) * width * 4);
  }
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", zlib.deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0))
  ]);
}

/* The mark: a ring crossed by an X, matching the centre glyph in the app.
   `inset` leaves room for the safe zone a maskable icon gets cropped to. */
function draw(size, { inset = 0.72, samples = 3 } = {}) {
  const buf = Buffer.alloc(size * size * 4);
  const c = size / 2;
  const R = (size / 2) * inset * 0.62; // ring radius
  const w = size * 0.052; // stroke width
  const half = w / 2;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let hits = 0;
      for (let sy = 0; sy < samples; sy++) {
        for (let sx = 0; sx < samples; sx++) {
          const px = x + (sx + 0.5) / samples - c;
          const py = y + (sy + 0.5) / samples - c;
          const d = Math.hypot(px, py);
          const onRing = Math.abs(d - R) <= half;
          const onCross =
            d <= R + half &&
            (Math.abs(px - py) / Math.SQRT2 <= half || Math.abs(px + py) / Math.SQRT2 <= half);
          if (onRing || onCross) hits++;
        }
      }
      const a = hits / (samples * samples);
      const i = (y * size + x) * 4;
      for (let ch = 0; ch < 3; ch++) {
        buf[i + ch] = Math.round(GROUND[ch] * (1 - a) + MARK[ch] * a);
      }
      buf[i + 3] = 255;
    }
  }
  return png(size, size, buf);
}

const targets = [
  ["icon-192.png", 192, 0.86],
  ["icon-512.png", 512, 0.86],
  ["icon-maskable-512.png", 512, 0.62], // extra padding for the mask crop
  ["apple-touch-icon.png", 180, 0.86]
];

for (const [name, size, inset] of targets) {
  const file = path.join(out, name);
  fs.writeFileSync(file, draw(size, { inset }));
  console.log(`${name.padEnd(24)} ${size}x${size}  ${fs.statSync(file).size} bytes`);
}
