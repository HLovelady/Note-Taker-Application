// dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");
const database = require("./db/db.json");

var PORT = process.env.PORT || 3001;

//Use express
const app = express();

//Set up data parsing, and use middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));



// Route for notes page
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/notes.html"))
);

//api routes
app.get('/api/notes', (req, res) => res.json(database));

//post: file '/notes' to receive newly created notdatabase to save on the request body,
// POST request to add a review
app.post("/api/notes", (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a note`);

  // Prepare a response object to send back to the client
  let response;
  let db;

  // Check if there is anything in the response body
  if (req.body) {
    db = JSON.parse(fs.readFileSync("db/db.json"));
    db.push(req.body);
    console.log(db);

    // Log the response body to the console
    console.log(req.body);
    const stringify = JSON.stringify(db);
    console.log("stringify", stringify);
    // pushing new note: created note will be written in database "db.json"
    fs.writeFileSync("db/db.json", stringify);

    response = {
      status: "success",
      data: req.body,
    };
    res.status(201).json(response);
  } else {
    res.status(400).json("Request body must at least contain a title");
  }
});

// Delete: (/notes/:id) should receive query parameter that contains the id of a note to delete
app.delete("/api/notes/:id", (req, res) => {
  console.log('delete route hit');
  // notes from database "db.json" read
  let db = JSON.parse(fs.readFileSync("db/db.json"));
  console.log('database',db);
  console.log('req.params',req.params.id);
  // note with id removed
  let deleteNotes = db.filter((item) => item.id !== req.params.id);
  console.log('delete',deleteNotes)
  // note written to database "db.json" with note deleted
  fs.writeFileSync("db/db.json", JSON.stringify(deleteNotes));
  res.json(deleteNotes);
});

// Route for homepage; need to change to * not /
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/index.html"))
);

//listener
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
