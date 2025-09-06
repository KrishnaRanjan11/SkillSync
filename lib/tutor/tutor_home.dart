import 'package:flutter/material.dart';
import 'upload_course.dart';
import 'resolve_doubt.dart';

class TutorHome extends StatelessWidget {
  const TutorHome({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Tutor Dashboard")),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ElevatedButton(
              onPressed: () => Navigator.push(
                context,
                MaterialPageRoute(builder: (_) => const UploadCoursePage()),
              ),
              child: const Text("Upload Course"),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: () => Navigator.push(
                context,
                MaterialPageRoute(builder: (_) => const ResolveDoubtsPage()),
              ),
              child: const Text("Resolve Doubts"),
            ),
          ],
        ),
      ),
    );
  }
}
