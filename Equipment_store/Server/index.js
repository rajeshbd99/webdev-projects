require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5173;

app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.407se.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        //await client.connect();
        console.log("Connected to the server");
        const database = client.db("sportshub");
        const equipmentsCollection = database.collection("equipements");

        app.get('/equipments', async (req, res) => {
            try {
                const { userEmail } = req.query;
        
                let query = {}; // Default to an empty query
                if (userEmail) {
                    query = { userEmail: userEmail }; // Filter by userEmail if provided
                }
        
                const jobs = await equipmentsCollection.find(query).toArray();
                res.send(jobs);
            } catch (error) {
                console.error("Error fetching equipment:", error);
                res.status(500).send({ message: "Failed to fetch equipment" });
            }
        });
        

        app.get('/equipments/:id', async (req, res) => {
            const id = req.params.id;
            const job = await equipmentsCollection.findOne({ _id: new ObjectId(id) });
            res.send(job);
        });

        app.get('/featured-equipments', async (req, res) => {
            const jobs = await equipmentsCollection.find().limit(6).toArray();
            res.send(jobs);
        });
       
        app.post('/equipments', async (req, res) => {
            const newJob = req.body;
            const result = await equipmentsCollection.insertOne(newJob);
            res.send(result);
            console.log(result)
        });

        app.delete('/equipments/:id', async (req, res) => {
            const id = req.params.id;
            const result = await equipmentsCollection.deleteOne({ _id: new ObjectId(id) });
            res.send(result);
        });

        app.put('/equipments/:id', async (req, res) => {
            const id = req.params.id;
            const updatedCampaign = req.body;
            delete updatedCampaign._id;
            const result = await equipmentsCollection.updateOne({ _id: new ObjectId(id) }, { $set: updatedCampaign });
            res.send(result);
        });

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }

    catch (error) {
        console.log(error);
    }
}
run().catch(console.dir);