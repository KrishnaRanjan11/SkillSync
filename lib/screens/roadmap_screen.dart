import 'package:flutter/material.dart';
import '../models/course.dart';
import '../widgets/roadmap_step_tile.dart';

class RoadmapScreen extends StatefulWidget {
  final Course course;

  const RoadmapScreen({super.key, required this.course});

  @override
  State<RoadmapScreen> createState() => _RoadmapScreenState();
}

class _RoadmapScreenState extends State<RoadmapScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("${widget.course.title} Roadmap")),
      body: ListView.builder(
        itemCount: widget.course.roadmap.length,
        itemBuilder: (context, index) {
          final step = widget.course.roadmap[index];
          return RoadmapStepTile(
            step: step,
            onToggle: () {
              setState(() {
                step.isCompleted = !step.isCompleted;
              });
            },
          );
        },
      ),
    );
  }
}
