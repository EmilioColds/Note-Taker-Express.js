// Declared the constants with require
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3001;

// Declared the middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

//Created the route for the notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

const dbNotes = path.join(__dirname, 'db.json');

// Created the promise to get all the notes
app.get('/api/notes', (req, res) => {
    fs.readFile(dbNotes, 'utf8', (err, data) => {
        if (err) throw err;
        res.send(JSON.parse(data));
    });
});

