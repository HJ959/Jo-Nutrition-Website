// One-off: makes the 1200x630 link preview image used by og:image on every page.
// Run from the repo root with: node scripts/make-og-image.js
// Output (src/media/og-image.jpg) is committed, and build-prod copies it to dist/media/.
const sharp = require('sharp');

sharp('src/media/JoImageHome.jpg')
  .resize(1200, 630, { fit: 'cover', position: 'attention' })
  .jpeg({ quality: 80, mozjpeg: true })
  .toFile('src/media/og-image.jpg')
  .then(info => console.log(info.width + 'x' + info.height, info.size, 'bytes'));
