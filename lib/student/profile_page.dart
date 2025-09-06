import 'package:flutter/material.dart';
import '../widgets/streak_heatmap.dart';


class ProfilePage extends StatelessWidget {
  const ProfilePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(title: const Text("Profile")),
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text("🔥 Streak", style: TextStyle(fontSize: 22, color: Colors.white)),
            const SizedBox(height: 12),
            SizedBox(height: 120, child: StreakHeatmap()),
            const SizedBox(height: 32),
            const Text("📘 Courses Enrolled: 3", style: TextStyle(fontSize: 20, color: Colors.white)),
            const SizedBox(height: 16),
            const Text("⏰ Hours Spent Learning This Week: 8 hrs",
                style: TextStyle(fontSize: 20, color: Colors.white)),
          ],
        ),
      ),
    );
  }
}
