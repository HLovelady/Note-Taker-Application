// dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");
const database = require('./db/db.json');

var PORT = process.env.PORT || 3001;

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



//post: file '/notes' to receive newly created note to save on the request body, 
app.post('/notes', (req, res) => {
  let db = fs.readFileSync('db/db.json');
  db = JSON.parse(db);
  // add it to the db.json file, and then return the new note to the client. 
  res.json(db);
  // creating note body
  let newNote = {
    title: req.body.title,
    text: req.body.text,
    // creating note unique id
    id: uniqid(),
  };

  
// pushing new note: created note will be written in database "db.json"
database.push(newNote);
fs.writeFileSync('db/db.json', JSON.stringify(database));
res.json(database);
});



// Delete: (/notes/:id) should receive query parameter that contains the id of a note to delete
  app.delete('/notes/:id', (req, res) => {
    // notes from database "db.json" read
    let db = JSON.parse(fs.readFileSync('db/db.json'))
    // note with id removed
    let deleteNotes = db.filter(item => item.id !== req.params.id);
    // note written to database "db.json" with note deleted
    fs.writeFileSync('db/db.json', JSON.stringify(deleteNotes));
    res.json(deleteNotes);
  });



//listener
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);