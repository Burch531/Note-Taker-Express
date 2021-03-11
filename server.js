// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require('fs');
const util = require('util');

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "./public")));

//Set variables
const writeAsync = util.promisify(fs.writeFile);
const readAsync = util.promisify(fs.readFile);
let notes;

// API GET Requests
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", function (req, res) {
    readAsync(path.join(__dirname, "./db/db.json"), "utf8")
        .then(function (data) {
            return res.json(JSON.parse(data));
        });
});


// API POST Requests
app.post("/api/notes", function (req, res) {
    const newNote = req.body;
    readAsync(path.join(__dirname, "./db/db.json"), "utf8")
        .then(function (data) {
            notes = JSON.parse(data);
            if (newNote.id || newNote.id === 0) {
                let currNote = notes[newNote.id];
                currNote.title = newNote.title;
                currNote.text = newNote.text;
            } else {
                notes.push(newNote);
            }
            writeAsync(path.join(__dirname, "./db/db.json"), JSON.stringify(notes))
                .then(function () {
                    console.log("Wrote db.json");
                })
        });
    res.json(newNote);
});


// API DELETE Requests


// LISTENER
// The below code effectively "starts" our server
app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});