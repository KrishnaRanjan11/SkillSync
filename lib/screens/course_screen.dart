import 'package:flutter/material.dart';
import '../models/course.dart';
import 'roadmap_screen.dart';

class CourseScreen extends StatelessWidget {
  final Course course;

  const CourseScreen({super.key, required this.course});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(course.title)),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(course.description, style: const TextStyle(fontSize: 16)),
            const SizedBox(height: 20),
            ElevatedButton(
              child: const Text("View Roadmap"),
              onPressed: () => Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (_) => RoadmapScreen(course: course),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
