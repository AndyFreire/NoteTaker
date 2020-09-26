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
    res.json(JSON.parse(data));
  })

});


app.post("/api/notes", function (req, res) {
  // Get the new note request
  newNote = req.body

  // get the old notes and store in savedNotes
  var savedNotes = JSON.parse(fs.readFileSync("db/db.json", "utf8"));

  // Add the new note to the savednotes
  savedNotes.push(newNote)

  // Write the old note back to the DB. Needed to stringify for this to work!
  fs.writeFileSync("db/db.json", JSON.stringify(savedNotes));

  // Return the new note as per the readme
  res.json(newNote);
});

app.delete("/api/notes", function (req, res) {
  // Get the new note request
  id = req.body

  // get the old notes and store in savedNotes
  var savedNotes = JSON.parse(fs.readFileSync("db/db.json", "utf8"));

  // Add the new note to the savednotes
  savedNotes.filter(note => id !== note.id);

  // Write the old note back to the DB. Needed to stringify for this to work!
  fs.writeFileSync("db/db.json", JSON.stringify(savedNotes));

  // Return the new note as per the readme
  res.status({200: "OK"});
});



// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});