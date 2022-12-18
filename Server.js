// dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");

//Use express
const app = express()


//Set up data parsing, and use middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//get request for home page
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en-US">
    
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Note Taker</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootswatch/4.1.3/flatly/bootstrap.min.css" />
    </head>
    
    <body>
      <nav class="navbar navbar-dark bg-dark">
        <a class="navbar-brand" href="/">Note Taker
        </a>
      </nav>
      <div class="container">
        <div style="margin-top: 80px;" class="jumbotron text-center">
          <h1 class="display-4">Note Taker <span role="img" aria-label="Memo">📝</span></h1>
          <h4 class="mt-4">Take notes with Express</h4>
          <a class="btn btn-primary btn-lg mt-4" href="/notes" role="button">Get Started</a>
        </div>
      </div>
      <script src="/assets/js/index.js"></script>
    </body>
    
    </html>
    `);
  });


  //Get request for notes page
  app.get('/notes', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en-US">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Note Taker</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/bootswatch/4.1.3/flatly/bootstrap.min.css"
        />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"
          integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU"
          crossorigin="anonymous"
        />
        <link rel="stylesheet" href="/assets/css/styles.css" />
      </head>
    
      <body>
        <nav class="navbar navbar-dark bg-dark">
          <a class="navbar-brand" href="/">Note Taker </a>
          <div class="icons">
            <i class="fas fa-save text-light save-note"></i>
            <i class="fas fa-plus text-light new-note"></i>
          </div>
        </nav>
        <div class="container-fluid">
          <div class="row">
            <div class="col-4 list-container">
              <div class="card">
                <ul class="list-group"></ul>
              </div>
            </div>
            <div class="col-8">
              <input
                class="note-title"
                placeholder="Note Title"
                maxlength="28"
                type="text"
              />
              <textarea class="note-textarea" placeholder="Note Text"></textarea>
            </div>
          </div>
        </div>
        <script src="/assets/js/index.js"></script>
      </body>
    </html>
    `);
  });


app.listen(3001)