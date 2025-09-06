class RoadmapStep {
  final String stepTitle;
  final String detail;
  bool isCompleted;

  RoadmapStep({
    required this.stepTitle,
    required this.detail,
    this.isCompleted = false,
  });
}
