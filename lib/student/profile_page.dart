import 'package:flutter/material.dart';
import '../widgets/streak_heatmap.dart';
import '../widgets/badge_grid.dart';
import '../services/badge_service.dart';

class ProfilePage extends StatelessWidget {
  const ProfilePage({super.key});

  @override
  Widget build(BuildContext context) {
    // Example streak value (later you can fetch this from user data)
    final streak = 100;
    final badges = BadgeService.checkBadges(streak);

    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(
        title: const Text(
          "Profile",
          style: TextStyle(color: Colors.yellow),
        ),
        backgroundColor: Colors.blueGrey,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              "🔥 Streak: $streak days",
              style: const TextStyle(fontSize: 20, color: Colors.white),
            ),
            const SizedBox(height: 8),
            const StreakHeatmap(),

            const SizedBox(height: 24),
            const Text(
              "📘 Courses Enrolled: 3",
              style: TextStyle(fontSize: 20, color: Colors.white),
            ),
            const SizedBox(height: 16),
            const Text(
              "⏰ Hours Spent Learning This Week: 8 hrs",
              style: TextStyle(fontSize: 20, color: Colors.white),
            ),

            const SizedBox(height: 24),
            const Text(
              "🏅 Badges Earned",
              style: TextStyle(fontSize: 20, color: Colors.yellow),
            ),
            const SizedBox(height: 12),
            badges.isNotEmpty
                ? BadgeGrid(badges: badges)
                : const Text(
              "No badges yet. Keep learning!",
              style: TextStyle(color: Colors.white70),
            ),
          ],
        ),
      ),
    );
  }
}
