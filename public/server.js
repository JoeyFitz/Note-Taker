const express = require('express');
const path = require('path');
const fs = require('fs');
const notes = require('../db/notes.json');
const uuid = require('./helpers/uuid');

const app = express();
const PORT = 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); //i might need to spell out the GET route further, i.e. /public/index.html
});

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'notes.html'))
);

// GET request for all notes
app.get('/api/notes', (req, res) => {
  // Log our request to the terminal
  console.info(`${req.method} request received to get notes`);

  // Sending all notes to the client
  return res.json(notes);
});

// // DO I NEED THIS???
// // GET request for a single note
// app.get('/api/notes/:note_id', (req, res) => {
//   if (req.body && req.params.note_id) {
//     console.info(`${req.method} request received to get a single a note`);
//     const noteId = req.params.note_id;
//     for (let i = 0; i < notes.length; i++) {
//       const currentNote = notes[i];
//       if (currentNote.note_id === noteId) {
//         res.json(currentNote);
//         return;
//       }
//     }
//     res.json('Note ID not found');
//   }
// });

// POST request to add a note
app.post('/api/notes', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a note`);

  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      note_id: uuid(),
    };

    // Obtain existing notes
    fs.readFile('./db/notes.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        // Convert string into JSON object
        const parsedNotes = JSON.parse(data);

        // Add a new note
        parsedNotes.push(newNote);

        // Write updated notes back to the file
        fs.writeFile(
          './db/notes.json',
          JSON.stringify(parsedNotes, null, 4),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info('Successfully updated notes!')
        );
      }
    });

    const response = {
      status: 'success',
      body: newNote,
    };

    console.log(response);
    res.json(response);
  } else {
    res.json('Error in posting note');
  }
});

// app.get('/routes', (req, res) =>
//   res.sendFile(path.join(__dirname, 'public/routes.html'))
// );

// // Fallback route for when a user attempts to visit routes that don't exist
// app.get('*', (req, res) =>
//   res.send(
//     `Make a GET request using Insomnia to <a href="http://localhost:${PORT}/api/terms">http://localhost:${PORT}/api/terms</a>`
//   )
// );

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
