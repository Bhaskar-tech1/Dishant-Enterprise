import { randomUUID } from 'node:crypto';
import { getDb } from './firebase-admin';

const COLLECTION = 'products';

function timestampValue(value) {
  if (typeof value === 'number') return value;
  if (value instanceof Date) return value.getTime();
  if (value && typeof value.toMillis === 'function') return value.toMillis();
  return 0;
}

function sortProducts(products) {
  return products.sort((a, b) => timestampValue(b.createdAt) - timestampValue(a.createdAt));
}

export async function getAllProducts() {
  const database = getDb();
  if (!database) {
    throw new Error('Firebase Admin credentials are not configured.');
  }

  const snapshot = await database.collection(COLLECTION).get();
  const products = snapshot.docs.map((docSnap) => ({
    ...docSnap.data(),
    id: docSnap.id,
  }));

  return sortProducts(products);
}

export async function getProductById(id) {
  if (!id) return null;
  const database = getDb();
  if (!database) {
    throw new Error('Firebase Admin credentials are not configured.');
  }

  const snap = await database.collection(COLLECTION).doc(id).get();
  const exists = typeof snap.exists === 'function' ? snap.exists() : snap.exists;
  if (exists) {
    return { ...snap.data(), id: snap.id };
  }

  return null;
}

export async function addProduct(productData) {
  const database = getDb();
  if (!database) {
    throw new Error('Firebase Admin credentials are not configured.');
  }

  const now = Date.now();
  const id = productData.id || `prod-${now}-${randomUUID().slice(0, 8)}`;
  const newProduct = {
    ...productData,
    id,
    createdAt: productData.createdAt || now,
    updatedAt: now,
    inStock: productData.inStock !== false,
    featured: productData.featured === true,
  };

  await database.collection(COLLECTION).doc(id).set(newProduct);
  return newProduct;
}

export async function updateProduct(id, updates) {
  if (!id) return null;
  const database = getDb();
  if (!database) {
    throw new Error('Firebase Admin credentials are not configured.');
  }

  const docRef = database.collection(COLLECTION).doc(id);
  const existingSnap = await docRef.get();
  const exists = typeof existingSnap.exists === 'function' ? existingSnap.exists() : existingSnap.exists;
  if (!exists) return null;

  const updateData = { ...updates, id, updatedAt: Date.now() };
  delete updateData.createdAt;

  await docRef.set(updateData, { merge: true });
  const snap = await docRef.get();
  return { ...snap.data(), id: snap.id };
}

export async function deleteProduct(id) {
  if (!id) return false;
  const database = getDb();
  if (!database) {
    throw new Error('Firebase Admin credentials are not configured.');
  }

  const docRef = database.collection(COLLECTION).doc(id);
  const snap = await docRef.get();
  const exists = typeof snap.exists === 'function' ? snap.exists() : snap.exists;
  if (!exists) return false;

  await docRef.delete();
  return true;
}

export async function seedProducts(seedItems) {
  const database = getDb();
  if (!database) {
    throw new Error('Firebase Admin credentials are not configured.');
  }

  const now = Date.now();
  const productsToSeed = seedItems.map((item) => ({
    ...item,
    createdAt: item.createdAt || now,
    updatedAt: now,
  }));

  const batch = database.batch();
  productsToSeed.forEach((product) => {
    batch.set(database.collection(COLLECTION).doc(product.id), product, { merge: true });
  });
  await batch.commit();

  return productsToSeed.length;
}
