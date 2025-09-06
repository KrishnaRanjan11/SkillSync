import 'package:flutter/material.dart';

class UploadCoursePage extends StatelessWidget {
  const UploadCoursePage({super.key});

  @override
  Widget build(BuildContext context) {
    final TextEditingController courseController = TextEditingController();
    final TextEditingController priceController = TextEditingController();

    return Scaffold(
      appBar: AppBar(title: const Text("Upload Course")),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            TextField(controller: courseController, decoration: const InputDecoration(labelText: "Course Name")),
            const SizedBox(height: 16),
            TextField(controller: priceController, decoration: const InputDecoration(labelText: "Price")),
            const SizedBox(height: 24),
            ElevatedButton(onPressed: () {}, child: const Text("Upload")),
          ],
        ),
      ),
    );
  }
}
