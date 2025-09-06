import 'package:flutter/material.dart';
import 'dart:math';

class StreakHeatmap extends StatelessWidget {
  final int weeks;
  final int days;
  final List<int> contributions; // activity data

  const StreakHeatmap({
    super.key,
    this.weeks = 52, // 1 year
    this.days = 7,   // days in a week
    this.contributions = const [],
  });

  // Choose color based on activity level
  Color _getColor(int value) {
    if (value == 0) return Colors.grey.shade900;       // no activity
    if (value < 3) return Colors.green.shade200;       // low activity
    if (value < 6) return Colors.green.shade400;       // medium activity
    return Colors.green.shade700;                      // high activity
  }

  @override
  Widget build(BuildContext context) {
    // if no contributions passed, generate random data
    final data = contributions.isEmpty
        ? List.generate(weeks * days, (_) => Random().nextInt(8))
        : contributions;

    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: List.generate(weeks, (weekIndex) {
          return Column(
            children: List.generate(days, (dayIndex) {
              int dataIndex = weekIndex * days + dayIndex;
              return Container(
                margin: const EdgeInsets.all(2),
                width: 16,
                height: 16,
                decoration: BoxDecoration(
                  color: _getColor(data[dataIndex]),
                  borderRadius: BorderRadius.circular(3),
                ),
              );
            }),
          );
        }),
      ),
    );
  }
}
