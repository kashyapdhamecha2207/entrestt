const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const app = express();
const port = 3000;

// MongoDB connection details
const uri  = "mongodb://localhost:27017/"
const dbName = "entrestt";

// Middleware
app.use(express.json());

let db, userLogin;

// Connect to MongoDB and initialize collections    
async function initializeDatabase() {
    try {
        const client = await MongoClient.connect(uri, { useUnifiedTopology: true });
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
app.use(cors());
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
        console.log("Request Object : ", req)
        console.log("Request Body : ", req.body)
        const newuserLogin = req.body;
        const result = await userLogin.insertOne(newuserLogin);
        res.status(201).send(`userLogin added with ID: ${result.insertedId}`);
    } catch (err) {
        res.status(500).send("Error adding userLogin: " + err.message);
    }
});

// PUT: Update a userLogin completely
app.put('/userLogin/:email', async (req, res) => {
    try {
        const email = parseInt(req.params.email);
        const updateduserLogin = req.body;
        const result = await userLogin.replaceOne({ email }, updateduserLogin);
        res.status(200).send(`${result.modifiedCount} document(s) updated`);
    } catch (err) {
        res.status(500).send("Error updating userLogin: " + err.message);
    }
});

// PATCH: Partially update a userLogin
app.patch('/userLogin/:phone', async (req, res) => {
    try {
        const phone = parseInt(req.params.phone);
        console.log(phone);
        const updates = req.body;
        const result = await userLogin.updateOne({ phone }, { $set: updates });
        res.status(200).send(`${result.modifiedCount} document(s) updated`);
    } catch (err) {
        res.status(500).send("Error partially updating userLogin: " + err.message);
    }
});

// app.patch('/userLogin/:email', async (req, res) => {
//     try {
//         const email = (req.params.email);
//         console.log(email);
//         const updates = req.body;
//         const result = await userLogin.updateOne({ email }, { $set: updates });
//         res.status(200).send(`${result.modifiedCount} document(s) updated`);
//     } catch (err) {
//         res.status(500).send("Error partially updating userLogin: " + err.message);
//     }
// });



// DELETE: Remove a userLogin
app.delete('/userLogin/:email', async (req, res) => {
    try {
        const email = parseInt(req.params.email);
        const result = await userLogin.deleteOne({ email });
        res.status(200).send(`${result.deletedCount} document(s) deleted`);
    } catch (err) {
        res.status(500).send("Error deleting userLogin: " + err.message);
    }
});