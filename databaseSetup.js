const mongoose = require("mongoose");

// Connection URI for your Atlas MongoDB cluster
const uri = process.env.DB_URI;
// Connect to the MongoDB cluster

const connectToDb = () => {
mongoose
  .connect(uri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));
};

module.exports = connectToDb;


