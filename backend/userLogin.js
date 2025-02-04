const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const app = express();
const port = 3000;

// MongoDB connection details
const uri = "mongodb+srv://kashyapdhamecha:Kashyap%4099@entrestt.db7vi.mongodb.net/entrestt?retryWrites=true&w=majority";
const dbName = "entrestt";

// Middleware
app.use(express.json());
app.use(cors());

let db, userLogin;

// Connect to MongoDB and initialize collections    
async function initializeDatabase() {
    try {
        const client = await MongoClient.connect(uri);
        console.log("Connected to MongoDB");

        db = client.db(dbName);
        userLogin = db.collection("userLogin");

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

// GET: List all userLogin
app.get('/userLogin', async (req, res) => {
    try {
        const alluserLogin = await userLogin.find().toArray();
        res.status(200).json(alluserLogin);
    } catch (err) {
        res.status(500).send("Error fetching userLogin: " + err.message);
    }
});

// POST: Add a new userLogin
app.post('/userLogin', async (req, res) => {
    try {
        console.log("Request Body: ", req.body);
        const newuserLogin = req.body;
        const result = await userLogin.insertOne(newuserLogin);
        res.status(201).send(`UserLogin added with ID: ${result.insertedId}`);
    } catch (err) {
        res.status(500).send("Error adding userLogin: " + err.message);
    }
});

// PUT: Update a userLogin completely by email
app.put('/userLogin/:email', async (req, res) => {
    try {
        const email = req.params.email; // Keep it as a string
        const updateduserLogin = req.body;
        const result = await userLogin.replaceOne({ email }, updateduserLogin);
        res.status(200).send(`${result.modifiedCount} document(s) updated`);
    } catch (err) {
        res.status(500).send("Error updating userLogin: " + err.message);
    }
});

// PATCH: Partially update a userLogin by phone
app.patch('/userLogin/:phone', async (req, res) => {
    try {
        const phone = req.params.phone; // Keep it as a string
        console.log("Updating phone:", phone);
        const updates = req.body;
        const result = await userLogin.updateOne({ phone }, { $set: updates });
        res.status(200).send(`${result.modifiedCount} document(s) updated`);
    } catch (err) {
        res.status(500).send("Error partially updating userLogin: " + err.message);
    }
});

// DELETE: Remove a userLogin by email
app.delete('/userLogin/:email', async (req, res) => {
    try {
        const email = req.params.email; // Keep it as a string
        const result = await userLogin.deleteOne({ email });
        res.status(200).send(`${result.deletedCount} document(s) deleted`);
    } catch (err) {
        res.status(500).send("Error deleting userLogin: " + err.message);
    }
});
