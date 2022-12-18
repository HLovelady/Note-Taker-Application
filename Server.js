// dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");

const PORT = 3001;

//Use express
const app = express()

//Set up data parsing, and use middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, './develop/public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './develop/public/notes.html'))
);

//listener
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);