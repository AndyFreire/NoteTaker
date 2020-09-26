// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// HTML Routes
// =============================================================
app.get("/", function (req, res) {
  console.log(__dirname);
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

// API Routes
// =============================================================

app.get("/api/notes", function (req, res) {

  fs.readFile("db/db.json", "utf8", function (err, data) {
    console.log(data);
    res.json(JSON.parse(data));
  })

});



// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});