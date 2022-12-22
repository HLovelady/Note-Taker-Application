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

// GET Route for homepage; need to change to * not /
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
);


//post: file '/api/notes' to receive newly created note to save on the request body, 
app.post('/api/notes', (req, res) => {
  let db = fs.readFileSync('db/db.json');
  db = JSON.parse(db);
  // add it to the db.json file, and then return the new note to the client. 
  res.json(db);
  // creating note body
  let userNote = {
    title: req.body.title,
    text: req.body.text,
    // creating note unique id
    id: uniqid(),
  };

// push: created note which will be written in database "db.json"
db.push(userNote);
fs.writeFileSync('db/db.json', JSON.stringify(db));
res.json(db);


//delete

});

//listener
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);