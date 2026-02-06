import Note from '../models/Note.js';

// Create a new note
export const createNewNote = async (req, res, next) => {
  try {
    const { title, content, tags, isPinned, isArchived, color, format } = req.body;
    const user = req.user._id; // Assuming you have authentication middleware that sets req.user

    const note = new Note({
      title,
      content,
      tags,
      isPinned,
      isArchived,
      color,
      format,
      user
    });

    await note.save();
    res.status(201).json(note);
  } catch (error) {
    next(error);
  }
};

// Get all notes for the authenticated user
export const getNotes = async (req, res, next) => {
  try {
    const user = req.user._id;
    // { user, isDeleted: false }).sort({ createdAt: -1 }
    const notes = await Note.find({ user }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    next(error);
  }
};

// Update a note
export const updateNotes = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = req.user._id;
    // , user

    const note = await Note.findOne({ _id: id, user });
    if (!note) return res.status(404).json({ message: 'Note not found' });

    // Update allowed fields
    const { title, content, tags, isPinned, isArchived, color, format } = req.body;
    if (title !== undefined) note.title = title;
    if (content !== undefined) note.content = content;
    if (tags !== undefined) note.tags = tags;
    if (isPinned !== undefined) note.isPinned = isPinned;
    if (isArchived !== undefined) note.isArchived = isArchived;
    if (color !== undefined) note.color = color;
    if (format !== undefined) note.format = format;

    await note.save();
    res.json(note);
  } catch (error) {
    next(error);
  }
};

// Soft-delete a note
export const deleteNotes = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = req.user._id;

    // , user
    const result = await Note.deleteOne({ _id: id, user });
    if (result.deletedCount === 0) return res.status(404).json({ message: "Note not found" });

    res.status(200).json({ _id: id }); // return the deleted id
  } catch (error) {
    next(error);
  }
};

// Search notes by text (optional)
export const searchNotes = async (req, res, next) => {
  try {
    const { query } = req.query;
    const user = req.user._id;

    const notes = await Note.find(
      { $text: { $search: query }, user,},
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } });

    res.json(notes);
  } catch (error) {
    next(error);
  }
};

// noteItemController.js
const noteItemController = {
  getNotes,
  createNewNote,
  deleteNotes,
  updateNotes,
};

export default noteItemController;
