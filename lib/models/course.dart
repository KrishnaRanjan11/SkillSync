import 'roadmap.dart';

class Course {
  final int id;
  final String title;
  final String description;
  final List<RoadmapStep> roadmap;

  Course({
    required this.id,
    required this.title,
    required this.description,
    required this.roadmap,
  });
}
