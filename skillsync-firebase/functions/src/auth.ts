import * as functions from 'firebase-functions';
import { getDb, setUserRoles } from './utils.js';

/**
 * onUserCreate: initialize a user doc and default role = candidate
 */
export const onUserCreate = functions.auth.user().onCreate(async (user) => {
  const db = getDb();
  const uid = user.uid;
  await setUserRoles(uid, ['candidate']);

  const userDoc = {
    uid,
    email: user.email ?? null,
    displayName: user.displayName ?? 'New User',
    photoURL: user.photoURL ?? null,
    role: 'candidate',
    createdAt: new Date(),
    updatedAt: new Date(),
    skills: [],
    headline: '',
    location: '',
    companyId: null
  };

  await db.collection('users').doc(uid).set(userDoc, { merge: true });
});