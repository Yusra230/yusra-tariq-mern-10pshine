const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    // Reference to the user who owns this note
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tags: [{
        type: String,
        trim: true
    }],
    isPinned: {
        type: Boolean,
        default: false
    },
    isArchived: {
        type: Boolean,
        default: false
    },
    color: {
        type: String,
        default: '#ffffff'
    },
    // For rich text formatting
    format: {
        type: String,
        enum: ['plain', 'markdown', 'html'],
        default: 'plain'
    },
    // For soft deletion
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
}, {
    timestamps: true
});

// Index for efficient queries
noteSchema.index({ user: 1, createdAt: -1 });
noteSchema.index({ title: 'text', content: 'text' });
const Note = mongoose.model('Note', noteSchema);
export default Note;