// dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");

//Use express
const app = express()

app.get('/', (req, res) => {
    res.send(
      'Use the API endpoint at <a href="http://localhost:3001/api">localhost:3001/api</a>'
    );
  });

app.listen(3001)