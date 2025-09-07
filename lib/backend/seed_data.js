await Course.insertMany([
  {
    title: "Flutter Development Bootcamp",
    description: "Learn Flutter from scratch to advanced.",
    roadmap: [
      { stepTitle: "Setup Flutter SDK", detail: "Install Flutter & set up IDE.", isCompleted: false },
      { stepTitle: "Widgets 101", detail: "Learn Stateless & Stateful Widgets.", isCompleted: false },
      { stepTitle: "State Management", detail: "Provider, Riverpod, Bloc.", isCompleted: false },
      { stepTitle: "Backend Integration", detail: "REST APIs, Firebase, MySQL.", isCompleted: false },
    ],
  },
  {
    title: "Backend with Node.js",
    description: "From basics to building REST APIs.",
    roadmap: [
      { stepTitle: "JavaScript Basics", detail: "ES6, async/await.", isCompleted: false },
      { stepTitle: "Node.js Core", detail: "fs, http, events.", isCompleted: false },
      { stepTitle: "Express.js", detail: "Routing, middleware.", isCompleted: false },
      { stepTitle: "Database", detail: "MySQL + MongoDB integration.", isCompleted: false },
    ],
  },
]);
