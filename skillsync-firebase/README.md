# SkillSync — Firebase Backend (for Flutter)

This repo is a complete Firebase backend scaffold for a Flutter app named **SkillSync** (job/skill matching). It includes:

- Authentication triggers (default role assignment)
- Firestore data model & security rules with role-based access
- Cloud Functions (TypeScript): user init, keyword search maintenance, job matching, scheduled maintenance
- Storage rules for avatars/logos/chat uploads
- Emulator config for local dev
- Seed script to populate basic data
- Composite indexes

> Replace `skillsync-CHANGE_ME` with your Firebase project ID in `.firebaserc`.

## Quickstart

1. **Install CLIs**
   ```bash
   npm i -g firebase-tools
   ```

2. **Login & set project**
   ```bash
   firebase login
   firebase use skillsync-CHANGE_ME
   ```

3. **Install functions**
   ```bash
   cd functions
   npm install
   npm run build
   ```

4. **Run emulators**
   ```bash
   cd ..
   firebase emulators:start
   ```

5. **Deploy**
   ```bash
   npm --prefix functions run build
   firebase deploy
   ```

## Firestore Schema (Top-level)

- `users/{uid}`: { uid, email, displayName, role: 'admin'|'recruiter'|'candidate', skills: string[], headline, location, companyId, searchKeywords, createdAt, updatedAt }
- `companies/{companyId}`: { name, website, ownerUid, createdAt }
- `jobs/{jobId}`: { title, description, companyId, createdBy, requiredSkills: string[], status: 'open'|'closed'|'draft', searchKeywords, createdAt, updatedAt, expiresAt, closedAt }
- `applications/{applicationId}`: { jobId, jobCreatedBy, applicantUid, coverLetter, status: 'applied'|'screening'|'interview'|'offer'|'rejected'|'withdrawn', createdAt, updatedAt }
- `chats/{chatId}`: { participants: uid[], lastMessageAt, createdAt }
  - `messages/{messageId}`: { fromUid, text, attachments?: string[], createdAt }

- `skills/{skillId}`: { name }

## Roles

- `candidate` (default)
- `recruiter`
- `admin`

Roles are stored in **custom claims** under `request.auth.token.roles` and set via Admin SDK. The included `onUserCreate` trigger assigns `candidate` by default. Provide an admin-only workflow to elevate users.

### Example: elevate to recruiter (callable)

```ts
// Add inside functions/src/index.ts after exporting others:
import * as functions from 'firebase-functions';
import { setUserRoles } from './utils.js';

export const elevateToRecruiter = functions.https.onCall(async (data, context) => {
  if (!context.auth || !context.auth.token.roles?.includes('admin')) {
    throw new functions.https.HttpsError('permission-denied', 'Admin only.');
  }
  const uid: string = data.uid;
  await setUserRoles(uid, ['recruiter']);
  return { ok: true };
});
```

## Flutter Integration (Dart)

```dart
// pubspec.yaml deps:
// firebase_core, firebase_auth, cloud_firestore, cloud_functions, firebase_storage

import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:cloud_functions/cloud_functions.dart';

Future<void> initFirebase() async {
  await Firebase.initializeApp(
    // use flutterfire configure to generate firebase_options.dart
  );
}

Future<void> signInAnonymously() async {
  await FirebaseAuth.instance.signInAnonymously();
}

Future<List<Map<String, dynamic>>> fetchJobMatches({int limit = 20}) async {
  final HttpsCallable callable = FirebaseFunctions.instance.httpsCallable('getJobMatches');
  final res = await callable.call({'limit': limit});
  return (res.data as List).cast<Map<String, dynamic>>();
}
```

## Security Notes

- Firestore & Storage rules assume roles in custom claims.
- Messages are immutable; edit by sending a new message.
- Applications readable by applicant and the job owner. Adjust to your needs.

## Indexes

`firestore.indexes.json` includes useful composites. If Firestore asks for more, add them and re-deploy.

## Seeding

Update `RECRUITER_UID` and `CANDIDATE_UID` in `seed/seed.ts` to existing Auth user IDs (or create users in Emulator). Run the seed with Admin credentials (locally it's automatic):

```bash
cd seed
npm install
npx ts-node seed.ts
```

---

Happy building! 🚀