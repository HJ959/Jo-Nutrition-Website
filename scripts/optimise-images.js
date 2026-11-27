// Reads originals from src/originals/ and writes WebP files to src/media/.
// Run with: npm run images
// The WebP outputs are committed, so the Netlify build does not run this.
const path = require('path');
const sharp = require('sharp');

const ORIGINALS = path.join(__dirname, '..', 'src', 'originals');
const MEDIA = path.join(__dirname, '..', 'src', 'media');
const QUALITY = 80;

// [input file, output name without extension, output width]
const jobs = [
  ['JoImageHome.jpg', 'JoImageHome-800', 800],
  ['JoImageHome.jpg', 'JoImageHome-1200', 1200],
  ['JoImageAbout.jpg', 'JoImageAbout-800', 800],
  ['JoImageAbout.jpg', 'JoImageAbout-1200', 1200],
  ['JoImageNutrition.jpg', 'JoImageNutrition-800', 800],
  ['JoImageNutrition.jpg', 'JoImageNutrition-1200', 1200],
  ['reception-1r_.png', 'reception-1r_', 640],
  ['06-the-woodland-room-4r.png', '06-the-woodland-room-4r', 640],
  ['07-the sunshine-room-5.png', '07-the-sunshine-room-5', 640],
];

async function main() {
  for (const [input, name, width] of jobs) {
    const out = path.join(MEDIA, `${name}.webp`);
    const info = await sharp(path.join(ORIGINALS, input))
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(out);
    console.log(`${name}.webp  ${info.width}x${info.height}  ${info.size} bytes`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
