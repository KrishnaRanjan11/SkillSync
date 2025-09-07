import * as functions from 'firebase-functions';
import { getDb } from './utils.js';

/**
 * Nightly maintenance: close expired jobs (status=open and expiresAt < now)
 */
export const nightlyMaintenance = functions.pubsub.schedule('every day 02:00').timeZone('UTC').onRun(async () => {
  const db = getDb();
  const now = new Date();
  const snap = await db.collection('jobs')
    .where('status', '==', 'open')
    .where('expiresAt', '<=', now)
    .get();

  const batch = db.batch();
  snap.forEach(doc => batch.update(doc.ref, { status: 'closed', closedAt: now }));
  await batch.commit();
});