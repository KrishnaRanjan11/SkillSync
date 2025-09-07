import * as admin from 'firebase-admin';

export function getAuth(): admin.auth.Auth {
  if (!admin.apps.length) {
    admin.initializeApp();
  }
  return admin.auth();
}

export function getDb(): FirebaseFirestore.Firestore {
  if (!admin.apps.length) {
    admin.initializeApp();
  }
  return admin.firestore();
}

export type Role = 'admin' | 'recruiter' | 'candidate';

export async function setUserRoles(uid: string, roles: Role[]) {
  const auth = getAuth();
  const current = await auth.getUser(uid);
  const currentClaims = current.customClaims || {};
  await auth.setCustomUserClaims(uid, { ...currentClaims, roles });
}

export function isValidRole(role: string): role is Role {
  return role === 'admin' || role === 'recruiter' || role === 'candidate';
}

export function searchableKeywords(text: string): string[] {
  if (!text) return [];
  const tokens = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
  const prefixes = new Set<string>();
  for (const tok of tokens) {
    for (let i = 1; i <= Math.min(tok.length, 8); i++) {
      prefixes.add(tok.slice(0, i));
    }
  }
  return Array.from(prefixes);
}