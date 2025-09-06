import 'package:flutter/material.dart';

class ResolveDoubtsPage extends StatelessWidget {
  const ResolveDoubtsPage({super.key});

  @override
  Widget build(BuildContext context) {
    final doubts = ["How to solve quadratic equations?", "Explain State in Flutter"];

    return Scaffold(
      appBar: AppBar(title: const Text("Resolve Doubts")),
      body: ListView.builder(
        itemCount: doubts.length,
        itemBuilder: (context, index) {
          return ListTile(
            title: Text(doubts[index], style: const TextStyle(color: Colors.white)),
            trailing: ElevatedButton(
              onPressed: () {},
              child: const Text("Answer"),
            ),
          );
        },
      ),
    );
  }
}
