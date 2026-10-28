const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const envPath = path.resolve(projectRoot, '.env.local');

// Load environment variables from .env.local
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  content.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const idx = trimmed.indexOf('=');
    if (idx !== -1) {
      const key = trimmed.slice(0, idx).trim();
      let val = trimmed.slice(idx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      process.env[key] = val;
    }
  });
}

const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const imagesDir = path.resolve(projectRoot, 'public/images');
const mapFile = path.resolve(projectRoot, 'src/data/cloudinary-map.json');

async function uploadAll() {
  const files = fs.readdirSync(imagesDir).filter(f => {
    const ext = path.extname(f).toLowerCase();
    return ['.png', '.jpg', '.jpeg', '.webp', '.svg'].includes(ext);
  });

  console.log(`Found ${files.length} images in public/images to upload to Cloudinary...`);

  // Load existing mapping if available
  let urlMap = {};
  if (fs.existsSync(mapFile)) {
    try {
      urlMap = JSON.parse(fs.readFileSync(mapFile, 'utf8'));
    } catch (e) {
      urlMap = {};
    }
  }

  let count = 0;
  for (const file of files) {
    count++;
    const localKey = `/images/${file}`;
    const filePath = path.resolve(imagesDir, file);
    const fileNameWithoutExt = path.parse(file).name;

    console.log(`[${count}/${files.length}] Uploading ${file} (${(fs.statSync(filePath).size / 1024 / 1024).toFixed(2)} MB)...`);

    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: 'dishanth-enterprise/assets',
        public_id: fileNameWithoutExt,
        overwrite: true,
        resource_type: 'image',
      });

      // Construct auto-optimized delivery URL (f_auto,q_auto)
      let optUrl = result.secure_url;
      if (optUrl.includes('/image/upload/')) {
        optUrl = optUrl.replace('/image/upload/', '/image/upload/f_auto,q_auto/');
      }

      urlMap[localKey] = optUrl;
      console.log(`  -> Uploaded successfully: ${optUrl}`);
    } catch (err) {
      console.error(`  -> Failed to upload ${file}:`, err.message);
    }
  }

  fs.writeFileSync(mapFile, JSON.stringify(urlMap, null, 2), 'utf8');
  console.log(`\nAll done! Saved ${Object.keys(urlMap).length} image URLs to ${mapFile}`);
}

uploadAll().catch(console.error);
