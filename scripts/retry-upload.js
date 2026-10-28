const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const envPath = path.resolve(projectRoot, '.env.local');

fs.readFileSync(envPath, 'utf8').split('\n').forEach(l => {
  const i = l.indexOf('=');
  if (i > -1) {
    let k = l.slice(0, i).trim();
    let v = l.slice(i + 1).trim();
    if ((valStartsWith(v, '"') && valEndsWith(v, '"')) || (valStartsWith(v, "'") && valEndsWith(v, "'"))) {
      v = v.slice(1, -1);
    }
    process.env[k] = v;
  }
});

function valStartsWith(str, char) { return str.startsWith(char); }
function valEndsWith(str, char) { return str.endsWith(char); }

const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const mapFile = path.resolve(projectRoot, 'src/data/cloudinary-map.json');
const map = JSON.parse(fs.readFileSync(mapFile, 'utf8'));

async function retry(file) {
  const filePath = path.resolve(projectRoot, 'public/images', file);
  const fileNameWithoutExt = path.parse(file).name;
  console.log('Uploading', file, '...');
  const res = await cloudinary.uploader.upload(filePath, {
    folder: 'dishanth-enterprise/assets',
    public_id: fileNameWithoutExt,
    overwrite: true,
    resource_type: 'image',
    timeout: 120000
  });
  let optUrl = res.secure_url;
  if (optUrl.includes('/image/upload/')) {
    optUrl = optUrl.replace('/image/upload/', '/image/upload/f_auto,q_auto/');
  }
  map['/images/' + file] = optUrl;
  console.log('Uploaded successfully:', optUrl);
}

(async () => {
  await retry('combos_page_banner_laptop.png');
  await retry('combos_page_banner_mobile.png');
  fs.writeFileSync(mapFile, JSON.stringify(map, null, 2), 'utf8');
  console.log('Saved all 38 image URLs to map!');
})().catch(console.error);
