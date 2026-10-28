import { DEFAULT_ANNOUNCEMENT, normalizeAnnouncement } from '@/config/announcement';
import { getDb } from '@/lib/firebase-admin';

const COLLECTION = 'siteSettings';
const DOCUMENT = 'announcement';

export async function getAnnouncement() {
  try {
    const database = getDb();
    if (!database) return { ...DEFAULT_ANNOUNCEMENT };

    const snapshot = await database.collection(COLLECTION).doc(DOCUMENT).get();
    const exists = typeof snapshot.exists === 'function' ? snapshot.exists() : snapshot.exists;
    if (exists) {
      return normalizeAnnouncement(snapshot.data());
    }
  } catch (error) {
    console.error('Firestore announcement fetch error:', error?.message);
  }

  return { ...DEFAULT_ANNOUNCEMENT };
}

export async function saveAnnouncement(value) {
  const announcement = normalizeAnnouncement(value);
  const database = getDb();
  if (!database) {
    throw new Error('Firebase Admin credentials are not configured.');
  }

  await database.collection(COLLECTION).doc(DOCUMENT).set({
    ...announcement,
    updatedAt: Date.now(),
  }, { merge: true });

  return announcement;
}
