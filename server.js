// Declared the constants with require
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

// Declared the middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

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

// Created the promise to post all the notes
app.post('/api/notes', (req, res) => {
    const newNote = req.body;

    fs.readFile(dbNotes, 'utf8', (err, data) => {
        if (err) throw err;
        const note = JSON.parse(data);
        newNote.id = Date.now(); 
        note.push(newNote);
        // Used append instead of write to store multiple notes
        fs.writeFile(dbNotes, JSON.stringify(note), (err) => {
            if (err) throw err;
            res.send('New note posted successfully');
        });
    });
});

// Created the promise to delete the notes
app.delete('/api/notes/:id', (req, res) => {
    const idNote = parseInt(req.params.id);

    fs.readFile(dbNotes, 'utf8', (err, data) => {
        if(err) throw err;
        let notes = JSON.parse(data);
        notes = notes.filter(notes => notes.id !== idNote);

        fs.writeFile(dbNotes, JSON.stringify(notes), (err) => {
            if (err) throw err;
            res.send('Note deleted successfully');
        });
    });
});

// Listener for the whole file and creating the server link
app.listen(PORT, () => {
    console.log(`The server is running at http://localhost:${PORT}`);
});