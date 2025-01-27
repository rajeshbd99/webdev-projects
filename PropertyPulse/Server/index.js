require("dotenv").config();
const express = require("express");
const cors = require("cors");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = express();
const admin = require("firebase-admin");
const serviceAccount = require("./config/real-estate-platform-653cf-firebase-adminsdk-3dosc-3be90f05f3.json");
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: ["http://localhost:5173", "https://real-estate-platform-653cf.web.app", "https://real-estate-platform-653cf.firebaseapp.com"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
};

// Verify JWT Middleware
const verifyToken = (req, res, next) => {
  const token = req?.cookies?.token;
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
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.b3ce0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Database and collections
let database;
let propertiesCollection;
let wishlistCollection;
let userCollection;
let offerCollection;
let reviewCollection;
let paymentCollection;

async function run() {
  try {
    // await client.connect();
    database = client.db("propertypulse");
    propertiesCollection = database.collection("properties");
    wishlistCollection = database.collection("wishlist");
    userCollection = database.collection("users");
    offerCollection = database.collection("offers");
    reviewCollection = database.collection("reviews");
    paymentCollection = database.collection("payments");
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

//jwt authentication
app.post("/jwt-auth", (req, res) => {
  const { email } = req.body;
  const token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "5h",
  });
  res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    })
    .send({ success: false });
});

//logout
app.post("/logout", (req, res) => {
  res.clearCookie("token", { path: "/", httpOnly: true, secure: true });
  res.status(200).send({ success: true });
});

//jwt get
app.get("/jwt-get", verifyToken, (req, res) => {
  res.send({ success: true});
});

// Routes
app.get("/", (req, res) => {
  res.send("Server is running");
});

//register user
app.put("/user",verifyToken, async (req, res) => {
  try {
    const userData = req.body;
    const email = userData.email;
    const options = { upsert: true };
    const query = { email: email };
    const update = { $set: req.body };
    const result = await userCollection.updateOne(query, update, options);
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: "Failed to update user" });
  }
});

//user role
app.get("/user-role/:email", verifyToken, async (req, res) => {
  try {
    const email = req.params.email;
    const query = { email: email };
    const user = await userCollection.findOne(query);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    res.send({ role: user.role ? user.role : "user" });
  } catch (error) {
    res.status(500).send({ error: "Failed to get user role" });
  }
});

//Make Admin
app.patch("/make-admin/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const update = { $set: { role: "admin" } };
    const result = await userCollection.updateOne(query, update);
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: "Failed to make admin" });
  }
});

//manage all users
app.get("/users", verifyToken, async (req, res) => {
  try {
    const users = await userCollection.find({}).toArray();
    res.send(users);
  } catch (error) {
    res.status(500).send({ error: "Failed to get users" });
  }
});

//mark as fraud
app.put("/users/mark-fraud/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const update = { $set: { fraud: true } };
    const result = await userCollection.updateOne(query, update, {
      upsert: true,
    });
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: "Failed to mark as fraud" });
  }
});

//delete fraud user properties
app.delete("/properties/agent/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const query = { agentEmail: email };
    const result = await propertiesCollection.deleteMany(query);
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: "Failed to delete fraud user properties" });
  }
});

//make agent
app.put("/users/make-agent/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const update = { $set: { role: "agent" } };
    const result = await userCollection.updateOne(query, update, {
      upsert: true,
    });
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: "Failed to make agent" });
  }
});

//make admin
app.put("/users/make-admin/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const update = { $set: { role: "admin" } };
    const result = await userCollection.updateOne(query, update, {
      upsert: true,
    });
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: "Failed to make admin" });
  }
});
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

//delete user
app.delete("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = { uid: id };
    const result = await userCollection.deleteOne(query);
    res.send(result);
    await admin.auth().deleteUser(id);
  } catch (error) {
    res.status(500).send({ error: "Failed to delete user" });
  }
});

//update advertise property
app.put("/properties/advertise/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const update = { $set: { advertise: true } };
    const result = await propertiesCollection.updateOne(query, update, {
      upsert: true,
    });
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: "Failed to update property" });
  }
});

//get advertise properties
app.get("/advertise-properties", async (req, res) => {
  try {
    const query = { advertise: true };
    const result = await propertiesCollection.find(query).toArray();
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: "Failed to get properties" });
  }
});

//requested properties
app.get("/offers/agent/:email",verifyToken, async (req, res) => {
  try {
    const query = {agentEmail:req.params.email};
    const result = await offerCollection.find(query).toArray();
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: "Failed to get properties" });
  }
});

// payment api
app.post("/create-payment-intent", async (req, res) => {
  const { price } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
      amount: price,
      currency: "usd",
      // In the latest version of the API, specifying the automatic_payment_methods parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
          enabled: true,
      },
  });
  res.send({
      clientSecret: paymentIntent.client_secret,
  });
});

//payment 
app.post("/payments", async (req, res) => {
  const paymentInfo = req.body;
  try {
    const paymentIntent = await paymentCollection.insertOne(
      paymentInfo
    );
    if (paymentIntent.insertedId) {
      const result = await offerCollection.updateOne(
        { _id: new ObjectId(paymentInfo.propertyId), buyerEmail: paymentInfo.buyerEmail },
        { $set: { buyingStatus: "bought", transactionId: paymentInfo.transactionId } },{upsert:true}
      );
      res.send(result);
    } else {  
      res.status(400).send({ error: "Failed to process payment" });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

//sold properties get
app.get("/sold-properties/agent/:email",verifyToken, async (req, res) => {
  const email = req.params.email;
  const result = await paymentCollection.find({ agentEmail: email }).toArray();
  res.send(result);
});

//reject request property
app.patch("/offers/reject/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await offerCollection.updateOne(query,{
      $set: { offerStatus: "rejected" }
    });
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: "Failed to delete offer" });
  }
});

//get all properties
app.get("/properties",verifyToken, async (req, res) => {
  try {
    const verifiedProperties = await propertiesCollection
      .find({ verificationStatus: "verified" })
      .toArray();
    res.json(verifiedProperties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).send("Internal Server Error");
  }
});

//get my properties
app.get("/my-properties/:email",verifyToken, async (req, res) => {
  const email = req.params.email;
  const result = await propertiesCollection
    .find({ agentEmail: email })
    .toArray();
  res.send(result);
});

//add property
app.post("/properties/add", async (req, res) => {
  const property = req.body;
  try {
    const result = await propertiesCollection.insertOne(property);
    res.send(result);
  } catch (error) {
    console.error("Error adding property:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Update property
app.get("/properties/details/:id", async (req, res) => {
  const id = req.params.id;
  const result = await propertiesCollection.findOne({ _id: new ObjectId(id) });
  res.send(result);
});

// Update property
app.patch("/properties/update/:id", async (req, res) => {
  const id = req.params.id;
  const property = req.body;
  const result = await propertiesCollection.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        propertyTitle: property.propertyTitle,
        location: property.location,
        priceRange: property.priceRange,
        agentEmail: property.agentEmail,
        verificationStatus: property.verificationStatus,
        agentName: property.agentName,
        image: property.image,
      },
    }
  );
  res.send(result);
});

//delete property
app.delete("/properties/delete/:id", async (req, res) => {
  const id = req.params.id;
  const result = await propertiesCollection.deleteOne({
    _id: new ObjectId(id),
  });
  res.send(result);
});

//verify property
app.patch("/properties/verify/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await propertiesCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { verificationStatus: "verified" } }
    );
    res.send(result);
  } catch (error) {
    console.error("Error verifying property:", error);
    res.status(500).send("Internal Server Error");
  }
});

//fetch all properties
app.get("/all-properties", verifyToken, async (req, res) => {
  const result = await propertiesCollection.find({}).toArray();
  res.send(result);
});

//user offers on properties
app.get("/offers/user/:email",verifyToken , async (req, res) => {
  const email = req.params.email;
  const result = await offerCollection.find({ buyerEmail: email }).toArray();
  res.send(result);
});

//reject request property
app.patch("/properties/reject/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await propertiesCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { verificationStatus: "rejected" } }
    );
    res.send(result);
  } catch (error) {
    console.error("Error verifying property:", error);
    res.status(500).send("Internal Server Error");
  }
});

//get property details
app.get("/property/:id", verifyToken , async (req, res) => {
  const { id } = req.params;
  try {
    const property = await propertiesCollection.findOne({
      _id: new ObjectId(id),
    });
    if (property) {
      res.json({
        ...property,
        priceRange: property.priceRange || { min: 0, max: Infinity },
      });
    } else {
      res.status(404).json({ message: "Property not found" });
    }
  } catch (error) {
    console.error("Error fetching property details:", error);
    res.status(500).send("Internal Server Error");
  }
});

//gat all reviews
app.get("/property/reviews/:id", verifyToken , async (req, res) => {
  const { id } = req.params;
  try {
    const property = await reviewCollection.find({
      propertyId: id,
    }).toArray();
    res.send(property);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).send("Internal Server Error");
  }
});

//insert property review
app.post("/property/review", async (req, res) => {
  const review = req.body;
  const result = await reviewCollection.insertOne(review);  

  res.send(result);
}
);

//get my reviews
app.get("/reviews/user/:email",verifyToken, async (req, res) => {
  const email = req.params.email;
  const result = await reviewCollection
    .find({ email:email }).toArray();
  res.send(result);
});

//delete review
app.delete("/reviews/:id",  async (req, res) => {
  const id = req.params.id;
  const result = await reviewCollection.deleteOne({
    _id: new ObjectId(id),
  });
  res.send(result);
});

//get all reviews by admin
app.get("/reviews", verifyToken, async (req, res) => {
  const result = await reviewCollection.find({}).toArray();
  res.send(result);
});

//delete review by admin
app.delete("/admin/reviews/:id", async (req, res) => {
  const id = req.params.id;
  const email=req.body.email;
  const result = await reviewCollection.deleteOne({
    _id: new ObjectId(id),email:email
  });
  res.send(result);
});

//get from wishlist
app.get("/wishlist/:userId",verifyToken, async (req, res) => {
  const { userId } = req.params;
  try {
    const wishlist = await wishlistCollection.find({ userId }).toArray();
    res.json(wishlist || []);
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    res.status(500).send("Internal Server Error");
  }
});

//add to wishlist
app.post("/wishlist", async (req, res) => {
  const wishlistItem = req.body;
  if (!wishlistItem.userId || !wishlistItem.propertyId) {
    return res.status(400).json({ message: "Invalid data format" });
  }
  try {
    const result = await wishlistCollection.insertOne(wishlistItem);
    res.json({
      message: "Property added to wishlist!",
      wishlistId: result.insertedId,
    });
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    res.status(500).send("Internal Server Error");
  }
});

//remove from wishlist
app.delete("/wishlist/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await wishlistCollection.deleteOne({
      _id: new ObjectId(id),
    });
    res.send(result);
  } catch (error) {
    console.error("Error removing wishlist item:", error);
    res.status(500).send("Internal Server Error");
  }
});

//offer made by a user
app.post("/make-offer/:id", async (req, res) => {
  const offerDetails = req.body;
  const result = await offerCollection.insertOne(offerDetails);
  res.send(result);
});

//offer accepted by agent
app.patch("/offers/accept/:id", async (req, res) => {
  const { id } = req.params;
  const propertyId=req.body.propertyId;
  try {
    const updateMulti= await offerCollection.updateMany(
      {propertyId:propertyId },
      { $set: { offerStatus: "rejected" } }
    );
    if(updateMulti.modifiedCount>0){
      const updateOne = await offerCollection.updateOne(
        { _id: new ObjectId(id),propertyId:propertyId },
        { $set: { offerStatus: "accepted" } }
      );
      res.send(updateOne);
    }
  } catch (error) {
    console.error("Error accepting offer:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Start server and connect to MongoDB
app.listen(port, async () => {
  // await connectToDatabase();
  console.log(`Server is running on port ${port}`);
});
run().catch(console.dir);