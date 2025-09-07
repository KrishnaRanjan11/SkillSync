import '../models/profile.dart';

class ProfileService {
  static Future<Profile> getProfile() async {
    // 🔗 Replace with API call (using http/Dio)
    await Future.delayed(const Duration(seconds: 1)); // simulate network delay
    return Profile(
      streakCount: 12,
      streakDates: [
        DateTime.now().subtract(const Duration(days: 1)),
        DateTime.now().subtract(const Duration(days: 2)),
        DateTime.now().subtract(const Duration(days: 4)),
      ],
      coursesEnrolled: 3,
      weeklyHours: 8,
    );
  }
}
