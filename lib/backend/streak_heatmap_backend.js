// Import necessary modules
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

// --- MongoDB Configuration ---
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
const dbName = 'student_streaks';
const collectionName = 'students';

// Initialize Express app
const server = express();
server.use(cors());
server.use(express.json());

// Main function to connect to the database and start the server
async function startServer() {
    try {
        await client.connect();
        console.log("Connected successfully to MongoDB.");
        const db = client.db(dbName);
        const studentsCollection = db.collection(collectionName);

        // --- API Endpoint: /watch-video ---
        server.post('/watch-video', async (req, res) => {
            const { studentId } = req.body;

            if (!studentId) {
                return res.status(400).json({ error: 'studentId is required.' });
            }

            console.log(`Processing video watch for student: ${studentId}`);

            try {
                const today = new Date();
                today.setHours(0, 0, 0, 0); // Normalize date to the beginning of the day

                const studentDoc = await studentsCollection.findOne({ studentId });

                if (studentDoc) {
                    // Check if today's date is already in the array to prevent duplicates
                    const watchedToday = studentDoc.watchDates.some(date => {
                        const watchedDate = new Date(date);
                        return watchedDate.setHours(0, 0, 0, 0) === today.getTime();
                    });

                    if (watchedToday) {
                        return res.status(200).json({ message: `Student ${studentId} has already watched a video today.` });
                    }

                    // Push today's date to the array
                    await studentsCollection.updateOne(
                        { studentId },
                        { $push: { watchDates: new Date() } }
                    );
                } else {
                    // Create a new document with the first watch date
                    await studentsCollection.insertOne({
                        studentId: studentId,
                        watchDates: [new Date()]
                    });
                }

                res.status(200).json({ message: 'Video watch event logged successfully.' });

            } catch (error) {
                console.error("Error logging video watch event:", error);
                res.status(500).json({ error: 'Failed to log watch event.' });
            }
        });

        // --- API Endpoint: /streak-data/:studentId ---
        // New endpoint to fetch the streak data for the heatmap
        server.get('/streak-data/:studentId', async (req, res) => {
            const { studentId } = req.params;

            try {
                const studentDoc = await studentsCollection.findOne({ studentId });

                if (!studentDoc) {
                    return res.status(404).json({ error: 'Student not found.' });
                }

                // Calculate the date 30 days ago
                const thirtyDaysAgo = new Date();
                thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                thirtyDaysAgo.setHours(0, 0, 0, 0);

                // Filter watch dates for the last 30 days
                const recentWatchDates = studentDoc.watchDates.filter(date => {
                    return new Date(date).getTime() >= thirtyDaysAgo.getTime();
                });
                
                res.status(200).json({ watchDates: recentWatchDates });

            } catch (error) {
                console.error("Error fetching streak data:", error);
                res.status(500).json({ error: 'Failed to fetch streak data.' });
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

// Start the server
startServer();