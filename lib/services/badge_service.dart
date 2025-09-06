import '../models/app_badge.dart';

class BadgeService {
  static List<AppBadge> checkBadges(int streak) {
    List<AppBadge> badges = [];

    if (streak >= 50) {
      badges.add(AppBadge(
        name: "50 Day Streak",
        iconPath: "assets/badges/streak_50.png",
      ));
    }
    if (streak >= 100) {
      badges.add(AppBadge(
        name: "100 Day Streak",
        iconPath: "assets/badges/streak_100.png",
      ));
    }
    if (streak >= 150) {
      badges.add(AppBadge(
        name: "150 Day Streak",
        iconPath: "assets/badges/streak_150.png",
      ));
    }

    return badges;
  }
}
