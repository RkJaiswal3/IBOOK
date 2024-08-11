const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// Route 1: Get all the notes using GET method: "api/notes/fetchallnotes"
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

// Route 2: Add a note using POST method: "/api/notes/addNotes"
router.post(
  "/addNotes",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }), // Validation setting by using express-validator
    body("description", "Description must be at least 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const saveNote = await note.save();
      res.json(saveNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

// Route 3: Update an existing note using PUT method: "/api/notes/updateNotes/:id"
router.put("/updateNotes/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  // Create a new note object
  try {
    const newNote = {};
    if (title) newNote.title = title;
    if (description) newNote.description = description;
    if (tag) newNote.tag = tag;

    // Find the note to be updated and update it
    let note = await Notes.findById(req.params.id);
    if (!note) return res.status(404).send("Not found"); // Changed status code to 404 for not found

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

// Route 4: Delete a note using DELETE method: "/api/notes/deleteNotes/:id"
router.delete("/deleteNotes/:id", fetchuser, async (req, res) => {
  try {
    // Find the note to be deleted and delete it
    let note = await Notes.findById(req.params.id);
    if (!note) return res.status(404).send("Not found"); // Changed status code to 404 for not found

    // Allow deletion only if user owns the note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted", note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
