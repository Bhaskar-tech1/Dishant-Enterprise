const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const envPath = path.resolve(projectRoot, '.env.local');

fs.readFileSync(envPath, 'utf8').split('\n').forEach(l => {
  const i = l.indexOf('=');
  if (i > -1) {
    let k = l.slice(0, i).trim();
    let v = l.slice(i + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    process.env[k] = v;
  }
});

const { getDb } = require(path.resolve(projectRoot, 'src/lib/firebase-admin'));
const db = getDb();

async function run() {
  const snap = await db.collection('products').get();
  console.log(`Found ${snap.size} products in Firestore.`);
  for (const doc of snap.docs) {
    const data = doc.data();
    if (data.image && data.image.includes('res.cloudinary.com') && !data.image.includes('f_auto,q_auto')) {
      const optimized = data.image.replace('/image/upload/', '/image/upload/f_auto,q_auto/');
      await db.collection('products').doc(doc.id).update({ image: optimized });
      console.log(`Optimized Firestore doc ${doc.id}: ${optimized}`);
    } else {
      console.log(`Doc ${doc.id} already optimized or non-cloudinary: ${data.image}`);
    }
  }
  console.log('All Firestore products optimized with f_auto,q_auto!');
}

run().catch(console.error);
