const express = require('express');
const router = express.Router();
const Note = require('../models/noteModel');
const protect = require('../middleware/authMiddleware');

// Get all notes for user
router.get('/', protect, async (req, res) => {
  const notes = await Note.find({ user: req.user });
  res.json(notes);
});

// Create note
router.post('/', protect, async (req, res) => {
  const note = await Note.create({
    user: req.user,
    title: req.body.title,
    content: req.body.content,
  });
  res.status(201).json(note);
});

// Update
router.put('/:id', protect, async (req, res) => {
  const note = await Note.findOneAndUpdate(
    { _id: req.params.id, user: req.user },
    req.body,
    { new: true }
  );
  res.json(note);
});

// Delete
router.delete('/:id', protect, async (req, res) => {
  await Note.findOneAndDelete({ _id: req.params.id, user: req.user });
  res.sendStatus(204);
});

module.exports = router;
