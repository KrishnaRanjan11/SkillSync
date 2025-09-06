import 'package:flutter/material.dart';
import 'profile_page.dart';

class StudentHome extends StatelessWidget {
  const StudentHome({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'SkillSync',
          style: TextStyle(
            color: Colors.yellow,
            fontWeight: FontWeight.bold,
            fontSize: 25,
            fontFamily: "Gravitica",
          ),
        ),
        backgroundColor: Colors.blueGrey,
        actions: [
          IconButton(
            icon: const Icon(Icons.account_circle, size: 32, color: Colors.white),
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => const ProfilePage()),
              );
            },
          ),
        ],
      ),
      backgroundColor: Colors.black,
      body: const Center(
        child: Text(
          "Browse and search courses here",
          style: TextStyle(color: Colors.white, fontSize: 18),
        ),
      ),
    );
  }
}
