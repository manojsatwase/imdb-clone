require("dotenv").config({ path: "./config/config.env" }); // Load environment variables

const express = require("express");
const { connectDB } = require("./config/db");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Importing route
const moviesRouter = require("./routes/moviesRoute")
app.use("/api/v1",moviesRouter)


app.listen(process.env.PORT, () => {
  console.log(`App running at ${process.env.PORT}`);
});
