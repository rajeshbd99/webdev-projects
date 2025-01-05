require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: ["http://localhost:5173", "https://restaurant-management-66f13.web.app", "https://restaurant-management-66f13.firebaseapp.com"],
    credentials: true,
    // methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    // allowedHeaders: "Content-Type,Authorization",
  })
);

// Middleware
// app.use(cors());
app.use(express.json());

app.use(cookieParser());

const cokkieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
};

// Verify JWT Middleware
const verifyToken = (req, res, next) => {
  const token = req?.cookies?.token;
  // console.log("Token received:", token);
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

// MongoDB URI and client setup
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cgu2y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Database and collections
let database;
let foodsCollection;
let ordersCollection;
let usersCollection;

async function run() {
  try {
    // await client.connect();
    database = client.db('dinefusion');
    foodsCollection = database.collection('foods');
    ordersCollection = database.collection('orders'); // Correct name spelling
    usersCollection = database.collection('users');
    console.log('Connected to MongoDB successfully!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

//jwt authentication
app.post("/jwt-auth", (req, res) => {
  const { email } = req.body;
  const token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "5h",
  });
  res
    .cookie("token", token, {
      httpOnly: true,

      //after deploying to https
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",

      // secure: false, // set to true after deploying to https
      // sameSite: 'none'
    })
    .send({ success: false });
});

//logout
app.post("/logout", (req, res) => {
  res.clearCookie("token", { path: "/", httpOnly: true, secure: true });
  res.status(200).send({ success: true });
  // res
  //   .clearCookie("token", {
  //     httpOnly: true,
  //     secure: false,
  //   })
  //   .send({ success: true });
});



//jwt get
app.get("/jwt-get", verifyToken, (req, res) => {
  // console.log("User data from token:", req.user);
  // console.log("cookies", req.cookies.token);
  res.send({ success: true});
});

// Routes
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Route to get all foods or search by name
app.get('/foods', async (req, res) => {
  const search = req.query.search || ''; // Get the search term from the query string

  try {
    // If search term exists, filter by name using regex (case insensitive)
    const filter = search
      ? { name: { $regex: search, $options: 'i' } }
      : {};

    // Fetch foods from the database
    const foods = await foodsCollection.find(filter).toArray();

    // Optionally, sort by purchaseCount
    const sortedFoods = foods.sort((a, b) => b.purchaseCount - a.purchaseCount);

    res.json(sortedFoods); // Return the sorted or filtered results
  } catch (error) {
    console.error('Error fetching foods:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to get a single food by ID
app.get('/foods/:id',async (req, res) => {
  const { id } = req.params;
  try {
    const food = await foodsCollection.findOne({ _id: new ObjectId(id) });
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }
    res.json(food);
  } catch (error) {
    console.error('Error fetching food by ID:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to get all orders
app.get('/orders',verifyToken, async (req, res) => {
  try {
    const orders = await ordersCollection.find({}).toArray();
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to add a new order
app.post('/orders',verifyToken, async (req, res) => {
  const newOrder = req.body;

  try {
    const result = await ordersCollection.insertOne(newOrder);

    if (result.acknowledged) {
      res.status(200).json({ message: 'Order added successfully', order: newOrder });
    } else {
      res.status(500).json({ message: 'Failed to add order' });
    }
  } catch (error) {
    console.error('Error adding order:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to get all users
app.get('/users', async (req, res) => {
  try {
    const users = await usersCollection.find({}).toArray();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to add a new user
app.post('/users', async (req, res) => {
  const newUser = req.body;
  try {
    const result = await usersCollection.insertOne(newUser);
    res.json(result);
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to add a new food item
app.post('/add-foods',verifyToken, async (req, res) => {
  const newFood = req.body;
  try {
    const result = await foodsCollection.insertOne(newFood);
    res.json(result);
  } catch (error) {
    console.error('Error adding food item:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Fetch foods based on the user email
app.get('/myfoods',verifyToken, async (req, res) => {
  const { email } = req.query;

  try {
    let filter = {};
    if (email) {
      filter = { userEmail: email }; // Filter foods by user email if provided
    }

    const foods = await foodsCollection.find(filter).toArray();
    res.json(foods); // Return the foods as a JSON response
  } catch (error) {
    console.error('Error fetching foods:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Update food item by ID
app.put('/foods/:id',verifyToken, async (req, res) => {
  const { id } = req.params;
  const updatedFood = req.body;

  try {
    // Remove _id from updated object to prevent overwriting the _id field
    delete updatedFood._id;

    const result = await foodsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedFood }
    );

    if (result.modifiedCount === 1) {
      res.json({ message: 'Food updated successfully' });
    } else {
      res.status(400).json({ message: 'Failed to update food' });
    }
  } catch (error) {
    console.error('Error updating food:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to get orders by user email
app.get('/my-orders',verifyToken, async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).send('Email is required to fetch orders.');
  }

  try {
    const orders = await ordersCollection.find({ buyerEmail: email }).toArray();
    res.json(orders);
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to delete an order by ID
app.delete('/orders/:id',verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await ordersCollection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 1) {
      res.status(200).send('Order deleted successfully');
    } else {
      res.status(404).send('Order not found');
    }
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start server and connect to MongoDB
app.listen(port, async () => {
  // await connectToDatabase();
  console.log(`Server is running on port ${port}`);
});

run().catch(console.dir);
