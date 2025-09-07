import * as functions from 'firebase-functions';
import { getDb, searchableKeywords } from './utils.js';

/**
 * Firestore triggers to maintain basic keyword prefixes to enable poor man's search.
 */
export const onJobWrite = functions.firestore.document('jobs/{jobId}')
  .onWrite(async (change, context) => {
    const db = getDb();
    const after = change.after.exists ? change.after.data() : null;
    if (!after) return;

    const fields = [after.title, after.description, (after.requiredSkills || []).join(' ')]
      .filter(Boolean)
      .join(' ');

    const keywords = searchableKeywords(fields);
    await change.after.ref.set({ searchKeywords: keywords, updatedAt: new Date() }, { merge: true });
  });

export const onUserWrite = functions.firestore.document('users/{uid}')
  .onWrite(async (change, context) => {
    const db = getDb();
    const after = change.after.exists ? change.after.data() : null;
    if (!after) return;

    const fields = [after.displayName, after.headline, (after.skills || []).join(' ')]
      .filter(Boolean)
      .join(' ');

    const keywords = searchableKeywords(fields);
    await change.after.ref.set({ searchKeywords: keywords, updatedAt: new Date() }, { merge: true });
  });