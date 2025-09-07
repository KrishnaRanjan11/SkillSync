import 'package:flutter/material.dart';
import '../services/profile_service.dart';
import '../models/profile.dart';
import '../widgets/streak_heatmap.dart';

class ProfilePage extends StatelessWidget {
  const ProfilePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(title: const Text("Profile")),
      body: FutureBuilder<Profile>(
        future: ProfileService.getProfile(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          }
          if (snapshot.hasError) {
            return Center(child: Text("Error: ${snapshot.error}", style: const TextStyle(color: Colors.red)));
          }

          final profile = snapshot.data!;
          return Padding(
            padding: const EdgeInsets.all(20.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text("🔥 Streak", style: TextStyle(fontSize: 22, color: Colors.white)),
                const SizedBox(height: 12),
                SizedBox(
                  height: 120,
                  child: StreakHeatmap(dates: profile.streakDates),
                ),
                const SizedBox(height: 32),
                Text("📘 Courses Enrolled: ${profile.coursesEnrolled}",
                    style: const TextStyle(fontSize: 20, color: Colors.white)),
                const SizedBox(height: 16),
                Text("⏰ Hours Spent Learning This Week: ${profile.weeklyHours} hrs",
                    style: const TextStyle(fontSize: 20, color: Colors.white)),
              ],
            ),
          );
        },
      ),
    );
  }
}
