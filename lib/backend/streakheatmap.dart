import 'package:flutter/material.dart';

class StreakHeatmap extends StatelessWidget {
  final List<DateTime> dates;
  const StreakHeatmap({super.key, required this.dates});

  @override
  Widget build(BuildContext context) {
    // For simplicity, just render colored boxes
    return Row(
      children: List.generate(14, (index) {
        final day = DateTime.now().subtract(Duration(days: index));
        final isActive = dates.any((d) =>
            d.year == day.year && d.month == day.month && d.day == day.day);
        return Container(
          margin: const EdgeInsets.all(2),
          width: 20,
          height: 20,
          color: isActive ? Colors.green : Colors.grey[800],
        );
      }),
    );
  }
}
