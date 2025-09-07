class Profile {
  final int streakCount; // consecutive days
  final List<DateTime> streakDates; // for heatmap
  final int coursesEnrolled;
  final int weeklyHours;

  Profile({
    required this.streakCount,
    required this.streakDates,
    required this.coursesEnrolled,
    required this.weeklyHours,
  });

  factory Profile.fromJson(Map<String, dynamic> json) {
    return Profile(
      streakCount: json['streakCount'],
      streakDates: (json['streakDates'] as List)
          .map((date) => DateTime.parse(date))
          .toList(),
      coursesEnrolled: json['coursesEnrolled'],
      weeklyHours: json['weeklyHours'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      "streakCount": streakCount,
      "streakDates": streakDates.map((d) => d.toIso8601String()).toList(),
      "coursesEnrolled": coursesEnrolled,
      "weeklyHours": weeklyHours,
    };
  }
}
