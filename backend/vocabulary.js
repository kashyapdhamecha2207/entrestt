const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const app = express();
const port = 8000;

// MongoDB connection details
const uri  = "mongodb://localhost:27017/"
const dbName = "entrestt";

// Middleware
app.use(express.json());

let db, vocabulary;

// Connect to MongoDB and initialize collections    
async function initializeDatabase() {
    try {
        const client = await MongoClient.connect(uri, { useUnifiedTopology: true });
        console.log("Connected to MongoDB");

        db = client.db(dbName);
        vocabulary = db.collection("vocabulary");

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
// GET: List all vocabulary
app.get('/vocabulary', async (req, res) => {
    try {
        const allvocabulary = await vocabulary.find().toArray();
        res.status(200).json(allvocabulary);
    } catch (err) {
        res.status(500).send("Error fetching vocabulary: " + err.message);
    }
});

// POST: Add a new vocabulary
app.post('/vocabulary', async (req, res) => {
    try {
        console.log("Request Object : ", req)
        console.log("Request Body : ", req.body)
        const newvocabulary = req.body;
        const result = await vocabulary.insertOne(newvocabulary);
        res.status(201).send(`vocabulary added with ID: ${result.insertedId}`);
    } catch (err) {
        res.status(500).send("Error adding vocabulary: " + err.message);
    }
});

// PUT: Update a vocabulary completely
app.put('/vocabulary/:email', async (req, res) => {
    try {
        const email = parseInt(req.params.email);
        const updatedvocabulary = req.body;
        const result = await vocabulary.replaceOne({ email }, updatedvocabulary);
        res.status(200).send(`${result.modifiedCount} document(s) updated`);
    } catch (err) {
        res.status(500).send("Error updating vocabulary: " + err.message);
    }
});

// PATCH: Partially update a vocabulary
app.patch('/vocabulary/:wordNumber', async (req, res) => {
    try {
        const wordNumber = parseInt(req.params.wordNumber);
        const updates = req.body;
        const result = await vocabulary.updateOne({ wordNumber }, { $set: updates });
        res.status(200).send(`${result.modifiedCount} document(s) updated`);
    } catch (err) {
        res.status(500).send("Error partially updating vocabulary: " + err.message);
    }
});

// app.patch('/vocabulary/:email', async (req, res) => {
//     try {
//         const email = (req.params.email);
//         console.log(email);
//         const updates = req.body;
//         const result = await vocabulary.updateOne({ email }, { $set: updates });
//         res.status(200).send(`${result.modifiedCount} document(s) updated`);
//     } catch (err) {
//         res.status(500).send("Error partially updating vocabulary: " + err.message);
//     }
// });



// DELETE: Remove a vocabulary
app.delete('/vocabulary/:email', async (req, res) => {
    try {
        const email = parseInt(req.params.email);
        const result = await vocabulary.deleteOne({ email });
        res.status(200).send(`${result.deletedCount} document(s) deleted`);
    } catch (err) {
        res.status(500).send("Error deleting vocabulary: " + err.message);
    }
});