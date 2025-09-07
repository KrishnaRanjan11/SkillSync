import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();

async function main() {
  // Create some skills
  const skills = ['Flutter', 'Dart', 'Firebase', 'TypeScript', 'Node.js', 'React', 'Python', 'SQL'];
  const batch = db.batch();
  for (const s of skills) {
    const ref = db.collection('skills').doc(s.toLowerCase());
    batch.set(ref, { name: s });
  }
  await batch.commit();

  // Create a recruiter and candidate placeholder (update UIDs as needed)
  const recruiterUid = 'RECRUITER_UID';
  const candidateUid = 'CANDIDATE_UID';

  // Users docs (these assume corresponding Auth users already exist)
  await db.collection('users').doc(recruiterUid).set({
    uid: recruiterUid,
    displayName: 'Riley Recruiter',
    role: 'recruiter',
    skills: ['Hiring', 'Interviewing'],
    headline: 'Tech recruiter @ SkillSync',
    createdAt: new Date()
  }, { merge: true });

  await db.collection('users').doc(candidateUid).set({
    uid: candidateUid,
    displayName: 'Casey Candidate',
    role: 'candidate',
    skills: ['Flutter', 'Dart', 'Firebase'],
    headline: 'Flutter dev looking for exciting roles',
    createdAt: new Date()
  }, { merge: true });

  // Company
  const companyRef = await db.collection('companies').add({
    name: 'SkillSync Inc.',
    website: 'https://example.com',
    ownerUid: recruiterUid,
    createdAt: new Date()
  });

  // Job
  await db.collection('jobs').add({
    title: 'Flutter Engineer',
    description: 'Build beautiful mobile apps using Flutter and Firebase.',
    requiredSkills: ['Flutter', 'Dart', 'Firebase'],
    status: 'open',
    createdBy: recruiterUid,
    companyId: companyRef.id,
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) // +30 days
  });

  console.log('Seed complete.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});