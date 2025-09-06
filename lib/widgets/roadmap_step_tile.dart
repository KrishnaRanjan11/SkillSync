import 'package:flutter/material.dart';
import '../models/roadmap.dart';

class RoadmapStepTile extends StatelessWidget {
  final RoadmapStep step;
  final VoidCallback onToggle;

  const RoadmapStepTile({super.key, required this.step, required this.onToggle});

  @override
  Widget build(BuildContext context) {
    return CheckboxListTile(
      title: Text(step.stepTitle, style: const TextStyle(fontWeight: FontWeight.bold)),
      subtitle: Text(step.detail),
      value: step.isCompleted,
      onChanged: (_) => onToggle(),
    );
  }
}
