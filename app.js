const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const exphbs = require('express-handlebars');

// Import the Database module (db.js)
const db = require("./movieDB");

// Initialize Express app
const app = express();

//MongoDB config
const database = require('./config/database');

// Connect to MongoDB and initialize the Movie model
try {
    // Connect to MongoDB and initialize the Movie model
    db.initialize(database.url);
} catch (error) {
    console.error("Failed to initialize database:", error);
    process.exit(1); // Exit the application on database connection failure
}

// Set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Set up Handlebars as the view engine
app.engine('hbs', exphbs.engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');

// Import and use movie routes
const movieRoutes = require("./routes/movies");
app.use("/api/movies", movieRoutes);

// Set constant for port
const PORT = process.env.PORT || 8000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
