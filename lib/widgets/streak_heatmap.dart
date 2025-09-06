import 'package:flutter/material.dart';

class StreakHeatmap extends StatelessWidget {
  const StreakHeatmap({super.key});

  @override
  Widget build(BuildContext context) {
    return GridView.builder(
      shrinkWrap: true,
      itemCount: 30, // last 30 days
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 7, // 7 days a week
        crossAxisSpacing: 4,
        mainAxisSpacing: 4,
      ),
      itemBuilder: (context, index) {
        return Container(
          width: 20,
          height: 20,
          decoration: BoxDecoration(
            color: index % 3 == 0 ? Colors.green : Colors.green.withOpacity(0.3),
            borderRadius: BorderRadius.circular(4),
          ),
        );
      },
    );
  }
}
