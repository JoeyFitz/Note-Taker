const express = require('express');
const path = require('path');

// // Require the JSON file and assign it to a variable called `termData`
// const termData = require('./terms.json');

const app = express();
const PORT = 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/send', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/sendFile.html'))
);

app.get('/routes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/routes.html'))
);

// // res.json() allows us to return JSON instead of a buffer, string, or static file
// app.get('/api', (req, res) => res.json(termData));

// // Fallback route for when a user attempts to visit routes that don't exist
// app.get('*', (req, res) =>
//   res.send(
//     `Make a GET request using Insomnia to <a href="http://localhost:${PORT}/api/terms">http://localhost:${PORT}/api/terms</a>`
//   )
// );

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
