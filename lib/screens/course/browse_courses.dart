import 'package:flutter/material.dart';

class BrowseCoursesScreen extends StatelessWidget {
  const BrowseCoursesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    // ✅ Replace with data from Firebase or API later
    final courses = [
      {"title": "Flutter Basics", "price": "100"},
      {"title": "Advanced Dart", "price": "150"},
      {"title": "UI/UX in Flutter", "price": "120"},
    ];

    return Scaffold(
      appBar: AppBar(title: const Text("Browse Courses")),
      body: ListView.builder(
        itemCount: courses.length,
        itemBuilder: (context, index) {
          final course = courses[index];
          return Card(
            margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            child: ListTile(
              title: Text(course["title"]!),
              subtitle: Text("Price: \$${course["price"]}"),
              trailing: const Icon(Icons.arrow_forward_ios),
              onTap: () {
                // ✅ Navigate to course details page
              },
            ),
          );
        },
      ),
    );
  }
}
