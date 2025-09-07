const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
const bcrypt = require('bcrypt'); // New: Import bcrypt for password hashing

// MongoDB Configuration
// IMPORTANT: Replace the placeholder below with your actual MongoDB connection URI.
const uri = 'mongodb://localhost:27017'; // Example URI for local MongoDB
const client = new MongoClient(uri);
const dbName = 'roadmaps_db';
const coursesCollectionName = 'courses';
const roadmapsCollectionName = 'roadmaps';
const usersCollectionName = 'users';

const server = express();
server.use(cors());
server.use(express.json());

// Set a salt round count for bcrypt. A higher number is more secure but slower.
const saltRounds = 10;

async function startServer() {
    try {
        await client.connect();
        console.log("Connected successfully to MongoDB.");
        const db = client.db(dbName);
        const coursesCollection = db.collection(coursesCollectionName);
        const roadmapsCollection = db.collection(roadmapsCollectionName);
        const usersCollection = db.collection(usersCollectionName);

        // --- Data Schemas ---
        // Courses will be stored in the 'courses' collection.
        // A sample course document:
        // {
        //   _id: ObjectId("..."),
        //   title: "Flutter Development",
        //   description: "Learn to build beautiful, natively compiled applications for mobile, web, and desktop.",
        //   roadmap: [
        //     { stepTitle: "Learn Dart Basics", detail: "Syntax, data types...", isCompleted: false },
        //     ...
        //   ]
        // }
        
        // Roadmaps will be stored in the 'roadmaps' collection, linked by userId.
        // A sample roadmap document:
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

        // Updated 'users' collection to manage roles with email and password
        // A sample user document:
        // {
        //   _id: ObjectId("..."),
        //   email: "jane.doe@example.com",
        //   password: "hashed_password_string",
        //   role: "student", // or "tutor"
        // }


        // --- API Endpoint: GET /courses ---
        // Retrieves a list of all courses.
        server.get('/courses', async (req, res) => {
            try {
                const courses = await coursesCollection.find({}).toArray();
                res.status(200).json(courses);
            } catch (error) {
                console.error("Error fetching courses:", error);
                res.status(500).json({ error: 'Failed to fetch courses.' });
            }
        });

        // --- API Endpoint: GET /roadmap/:userId ---
        // Retrieves a user's specific roadmap from the database.
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

        // --- API Endpoint: POST /users/register ---
        // Registers a new user with a specified role.
        // Expected body: { email: "...", password: "...", role: "student" | "tutor" }
        server.post('/users/register', async (req, res) => {
            const { email, password, role } = req.body;
            if (!email || !password || !role) {
                return res.status(400).json({ error: 'Email, password, and role are required.' });
            }

            try {
                const existingUser = await usersCollection.findOne({ email });
                if (existingUser) {
                    return res.status(409).json({ error: 'Email already exists.' });
                }

                const hashedPassword = await bcrypt.hash(password, saltRounds);

                const newUser = { email, password: hashedPassword, role };
                const result = await usersCollection.insertOne(newUser);
                
                res.status(201).json({
                    message: 'User registered successfully.',
                    userId: result.insertedId,
                    role: role
                });
            } catch (error) {
                console.error("Error registering user:", error);
                res.status(500).json({ error: 'Failed to register user.' });
            }
        });

        // --- API Endpoint: POST /users/login ---
        // 'Logs in' a user by returning their role.
        // Expected body: { email: "...", password: "..." }
        server.post('/users/login', async (req, res) => {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ error: 'Email and password are required.' });
            }

            try {
                const user = await usersCollection.findOne({ email });
                if (!user) {
                    return res.status(404).json({ error: 'User not found.' });
                }
                
                const passwordMatch = await bcrypt.compare(password, user.password);
                if (!passwordMatch) {
                    return res.status(401).json({ error: 'Incorrect password.' });
                }

                res.status(200).json({
                    message: 'Login successful.',
                    userId: user._id,
                    role: user.role
                });
            } catch (error) {
                console.error("Error logging in user:", error);
                res.status(500).json({ error: 'Failed to log in user.' });
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
