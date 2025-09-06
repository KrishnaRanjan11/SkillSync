import 'package:flutter/material.dart';
import '../student/student_home.dart';
import '../tutor/tutor_home.dart';

class RolePage extends StatelessWidget {
  const RolePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Choose Role")),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ElevatedButton(
              onPressed: () => Navigator.pushReplacement(
                context,
                MaterialPageRoute(builder: (_) => const StudentHome()),
              ),
              child: const Text("I am a Student"),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: () => Navigator.pushReplacement(
                context,
                MaterialPageRoute(builder: (_) => const TutorHome()),
              ),
              child: const Text("I am a Tutor"),
            ),
          ],
        ),
      ),
    );
  }
}
