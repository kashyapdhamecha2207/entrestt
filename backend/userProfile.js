const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const app = express();
const port = 5000;

// MongoDB connection details
const uri  = "mongodb+srv://Test:Kashyap99@cluster0.vwkop.mongodb.net/"
const dbName = "entrestt";

// Middleware
app.use(express.json());

let db, userProfile;

// Connect to MongoDB and initialize collections    
async function initializeDatabase() {
    try {
        const client = await MongoClient.connect(uri, { useUnifiedTopology: true });
        console.log("Connected to MongoDB");

        db = client.db(dbName);
        userProfile = db.collection("userProfile");

        // Start server after successful DB connection
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1); // Exit if database connection fails
    }
}

// Initialize Database
initializeDatabase();

// Routes
app.use(cors());
// GET: List all userProfile
app.get('/userProfile', async (req, res) => {
    try {
        const alluserProfile = await userProfile.find().toArray();
        res.status(200).json(alluserProfile);
    } catch (err) {
        res.status(500).send("Error fetching userProfile: " + err.message);
    }
});

// POST: Add a new userProfile
app.post('/userProfile', async (req, res) => {
    try {
        console.log("Request Object : ", req)
        console.log("Request Body : ", req.body)
        const newuserProfile = req.body;
        const result = await userProfile.insertOne(newuserProfile);
        res.status(201).send(`userProfile added with ID: ${result.insertedId}`);
    } catch (err) {
        res.status(500).send("Error adding userProfile: " + err.message);
    }
});

// PUT: Update a userProfile completely
app.put('/userProfile/:email', async (req, res) => {
    try {
        const email = parseInt(req.params.email);
        const updateduserProfile = req.body;
        const result = await userProfile.replaceOne({ email }, updateduserProfile);
        res.status(200).send(`${result.modifiedCount} document(s) updated`);
    } catch (err) {
        res.status(500).send("Error updating userProfile: " + err.message);
    }
});

// PATCH: Partially update a userProfile
app.patch('/userProfile/:userNumber', async (req, res) => {
    try {
        const userNumber = parseInt(req.params.userNumber);
        const updates = req.body;
        const result = await userProfile.updateOne({ userNumber }, { $set: updates });
        res.status(200).send(`${result.modifiedCount} document(s) updated`);
    } catch (err) {
        res.status(500).send("Error partially updating userProfile: " + err.message);
    }
});

// app.patch('/userProfile/:email', async (req, res) => {
//     try {
//         const email = (req.params.email);
//         console.log(email);
//         const updates = req.body;
//         const result = await userProfile.updateOne({ email }, { $set: updates });
//         res.status(200).send(`${result.modifiedCount} document(s) updated`);
//     } catch (err) {
//         res.status(500).send("Error partially updating userProfile: " + err.message);
//     }
// });



// DELETE: Remove a userProfile
app.delete('/userProfile/:email', async (req, res) => {
    try {
        const email = parseInt(req.params.email);
        const result = await userProfile.deleteOne({ email });
        res.status(200).send(`${result.deletedCount} document(s) deleted`);
    } catch (err) {
        res.status(500).send("Error deleting userProfile: " + err.message);
    }
});