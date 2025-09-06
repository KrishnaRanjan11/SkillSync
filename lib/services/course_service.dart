import '../models/course.dart';
import '../models/roadmap.dart';

class CourseService {
  static List<Course> getCourses() {
    return [
      Course(
        id: 1,
        title: "Flutter Development Bootcamp",
        description: "Learn Flutter from scratch to advanced.",
        roadmap: [
          RoadmapStep(stepTitle: "Setup Flutter SDK", detail: "Install Flutter & set up IDE."),
          RoadmapStep(stepTitle: "Widgets 101", detail: "Learn Stateless & Stateful Widgets."),
          RoadmapStep(stepTitle: "State Management", detail: "Provider, Riverpod, Bloc."),
          RoadmapStep(stepTitle: "Backend Integration", detail: "REST APIs, Firebase, MySQL."),
        ],
      ),
      Course(
        id: 2,
        title: "Backend with Node.js",
        description: "From basics to building REST APIs.",
        roadmap: [
          RoadmapStep(stepTitle: "JavaScript Basics", detail: "ES6, async/await."),
          RoadmapStep(stepTitle: "Node.js Core", detail: "fs, http, events."),
          RoadmapStep(stepTitle: "Express.js", detail: "Routing, middleware."),
          RoadmapStep(stepTitle: "Database", detail: "MySQL + MongoDB integration."),
        ],
      ),
    ];
  }
}
