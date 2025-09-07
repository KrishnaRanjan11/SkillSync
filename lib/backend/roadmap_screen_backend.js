const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

// MongoDB Configuration
// IMPORTANT: Replace the placeholder below with your actual MongoDB connection URI.
const uri = 'mongodb://localhost:27017'; // Example URI for local MongoDB
const client = new MongoClient(uri);
const dbName = 'roadmaps_db';
const collectionName = 'roadmaps';

const server = express();
server.use(cors());
server.use(express.json());

async function startServer() {
    try {
        await client.connect();
        console.log("Connected successfully to MongoDB.");
        const db = client.db(dbName);
        const roadmapsCollection = db.collection(collectionName);

        // --- Data Schema ---
        // Roadmaps will be stored as documents in the 'roadmaps' collection.
        // A sample document would look like this:
        // {
        //   _id: ObjectId("..."),
        //   userId: "user123",
        //   title: "Flutter Development",
        //   steps: [
        //     { stepTitle: "Learn Dart Basics", detail: "Syntax, data types...", isCompleted: true },
        //     { stepTitle: "Widgets Fundamentals", detail: "Stateless, Stateful...", isCompleted: false },
        //     ...
        //   ]
        // }

        // --- API Endpoint: GET /roadmap/:userId ---
        // Retrieves a user's roadmap from the database.
        server.get('/roadmap/:userId', async (req, res) => {
            const { userId } = req.params;
            try {
                const roadmap = await roadmapsCollection.findOne({ userId });
                if (!roadmap) {
                    return res.status(404).json({ error: 'Roadmap not found.' });
                }
                res.status(200).json(roadmap);
            } catch (error) {
                console.error("Error fetching roadmap:", error);
                res.status(500).json({ error: 'Failed to fetch roadmap.' });
            }
        });

        // --- API Endpoint: POST /roadmap ---
        // Creates a new roadmap for a user.
        // Expected body: { userId: "...", title: "...", steps: [...] }
        server.post('/roadmap', async (req, res) => {
            const newRoadmap = req.body;
            if (!newRoadmap || !newRoadmap.userId) {
                return res.status(400).json({ error: 'Invalid roadmap data.' });
            }
            try {
                const result = await roadmapsCollection.insertOne(newRoadmap);
                res.status(201).json({
                    message: 'Roadmap created successfully.',
                    id: result.insertedId
                });
            } catch (error) {
                console.error("Error creating roadmap:", error);
                res.status(500).json({ error: 'Failed to create roadmap.' });
            }
        });

        // --- API Endpoint: PUT /roadmap/:userId/steps/:stepIndex ---
        // Toggles the `isCompleted` status of a specific step.
        server.put('/roadmap/:userId/steps/:stepIndex', async (req, res) => {
            const { userId, stepIndex } = req.params;
            const index = parseInt(stepIndex, 10);
            
            if (isNaN(index)) {
                return res.status(400).json({ error: 'stepIndex must be a number.' });
            }
            
            try {
                const roadmap = await roadmapsCollection.findOne({ userId });
                if (!roadmap) {
                    return res.status(404).json({ error: 'Roadmap not found.' });
                }

                if (index < 0 || index >= roadmap.steps.length) {
                    return res.status(400).json({ error: 'Step index is out of bounds.' });
                }

                // Toggle the completion status
                const newStatus = !roadmap.steps[index].isCompleted;
                const updateQuery = {
                    $set: { [`steps.${index}.isCompleted`]: newStatus }
                };

                await roadmapsCollection.updateOne({ userId }, updateQuery);
                
                res.status(200).json({
                    message: `Step ${index} completion status updated.`,
                    isCompleted: newStatus
                });
            } catch (error) {
                console.error("Error updating step status:", error);
                res.status(500).json({ error: 'Failed to update step status.' });
            }
        });

        const PORT = process.env.PORT || 3000;
        server.listen(PORT, () => {
            console.log(`Backend server listening at http://localhost:${PORT}`);
        });

    } catch (err) {
        console.error("Failed to start server or connect to MongoDB:", err);
        process.exit();
    }
}

startServer();
