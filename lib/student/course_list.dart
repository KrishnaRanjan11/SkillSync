import 'package:flutter/material.dart';

class CourseBrowser extends StatelessWidget {
  const CourseBrowser({super.key});

  @override
  Widget build(BuildContext context) {
    final courses = ["Math Basics", "Flutter Dev", "AI for Beginners"];

    return ListView.builder(
      itemCount: courses.length,
      itemBuilder: (context, index) {
        return ListTile(
          title: Text(courses[index], style: const TextStyle(color: Colors.white)),
          subtitle: const Text("Tap to view details", style: TextStyle(color: Colors.grey)),
        );
      },
    );
  }
}
