import * as functions from 'firebase-functions';
import { getDb } from './utils.js';

/**
 * Callable function that returns top matching jobs for a given user.
 * Simple Jaccard similarity on skill arrays.
 */
export const getJobMatches = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'You must be signed in.');
  }

  const db = getDb();
  const limit: number = Math.min(Number(data?.limit ?? 20), 50);

  const userSnap = await db.collection('users').doc(context.auth.uid).get();
  const userSkills: string[] = (userSnap.data()?.skills ?? []).map((s: string) => s.toLowerCase());

  const jobsSnap = await db.collection('jobs').where('status', '==', 'open').limit(200).get();

  type Job = FirebaseFirestore.DocumentData & { id: string };
  const scored: { job: Job, score: number }[] = [];

  jobsSnap.forEach((doc) => {
    const job = { id: doc.id, ...doc.data() } as Job;
    const required: string[] = (job.requiredSkills ?? []).map((s: string) => s.toLowerCase());
    const setA = new Set(userSkills);
    const setB = new Set(required);
    const inter = new Set([...setA].filter(x => setB.has(x)));
    const union = new Set([...setA, ...setB]);
    const score = union.size > 0 ? inter.size / union.size : 0;
    scored.push({ job, score });
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit);
});