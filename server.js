// This sets up the basic properties for our express server
const express = require("express");
const path = require("path");
const fs = require('fs');
const util = require('util');

// Tells node that we are creating an "express" server
const app = express();

// Sets an initial port. We"ll use this later in our listener
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "./public")));


// LISTENER
// The below code effectively "starts" our server
app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});