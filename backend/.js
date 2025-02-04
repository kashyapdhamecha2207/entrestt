const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 8000;

// MongoDB connection details
const uri = "mongodb+srv://kashyapdhamecha:Kashyap%4099@entrestt.db7vi.mongodb.net/entrestt?retryWrites=true&w=majority";
const dbName = "entrestt";

// Middleware
app.use(express.json());
app.use(cors());

let db, userLogin, userProfile, vocabulary;

// Connect to MongoDB and initialize collections
async function initializeDatabase() {
    try {
        const client = await MongoClient.connect(uri, { useUnifiedTopology: true });
        console.log("Connected to MongoDB");

        db = client.db(dbName);
        userLogin = db.collection("userLogin");
        userProfile = db.collection("userProfile");
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

// User Login Routes
app.get('/userLogin', async (req, res) => {
    try {
        const allUserLogin = await userLogin.find().toArray();
        res.status(200).json(allUserLogin);
    } catch (err) {
        res.status(500).send("Error fetching userLogin: " + err.message);
    }
});

app.post('/userLogin', async (req, res) => {
    try {
        const newUserLogin = req.body;
        const result = await userLogin.insertOne(newUserLogin);
        res.status(201).send(`UserLogin added with ID: ${result.insertedId}`);
    } catch (err) {
        res.status(500).send("Error adding userLogin: " + err.message);
    }
});

app.put('/userLogin/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const updatedUserLogin = req.body;
        const result = await userLogin.replaceOne({ email }, updatedUserLogin);
        res.status(200).send(`${result.modifiedCount} document(s) updated`);
    } catch (err) {
        res.status(500).send("Error updating userLogin: " + err.message);
    }
});

app.patch('/userLogin/:phone', async (req, res) => {
    try {
        const phone = req.params.phone;
        const updates = req.body;
        const result = await userLogin.updateOne({ phone }, { $set: updates });
        res.status(200).send(`${result.modifiedCount} document(s) updated`);
    } catch (err) {
        res.status(500).send("Error partially updating userLogin: " + err.message);
    }
});

app.delete('/userLogin/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const result = await userLogin.deleteOne({ email });
        res.status(200).send(`${result.deletedCount} document(s) deleted`);
    } catch (err) {
        res.status(500).send("Error deleting userLogin: " + err.message);
    }
});

// User Profile Routes
app.get('/userProfile', async (req, res) => {
    try {
        const allUserProfile = await userProfile.find().toArray();
        res.status(200).json(allUserProfile);
    } catch (err) {
        res.status(500).send("Error fetching userProfile: " + err.message);
    }
});

app.post('/userProfile', async (req, res) => {
    try {
        const newUserProfile = req.body;
        const result = await userProfile.insertOne(newUserProfile);
        res.status(201).send(`UserProfile added with ID: ${result.insertedId}`);
    } catch (err) {
        res.status(500).send("Error adding userProfile: " + err.message);
    }
});

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

app.delete('/userProfile/:userNumber', async (req, res) => {
    try {
        const userNumber = parseInt(req.params.userNumber);
        const result = await userProfile.deleteOne({ userNumber });
        res.status(200).send(`${result.deletedCount} document(s) deleted`);
    } catch (err) {
        res.status(500).send("Error deleting userProfile: " + err.message);
    }
});

// Vocabulary Routes
app.get('/vocabulary', async (req, res) => {
    try {
        const allVocabulary = await vocabulary.find().toArray();
        res.status(200).json(allVocabulary);
    } catch (err) {
        res.status(500).send("Error fetching vocabulary: " + err.message);
    }
});

app.post('/vocabulary', async (req, res) => {
    try {
        const newVocabulary = req.body;
        const result = await vocabulary.insertOne(newVocabulary);
        res.status(201).send(`Vocabulary added with ID: ${result.insertedId}`);
    } catch (err) {
        res.status(500).send("Error adding vocabulary: " + err.message);
    }
});

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

app.delete('/vocabulary/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const result = await vocabulary.deleteOne({ email });
        res.status(200).send(`${result.deletedCount} document(s) deleted`);
    } catch (err) {
        res.status(500).send("Error deleting vocabulary: " + err.message);
    }
});
