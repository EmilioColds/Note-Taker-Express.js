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
