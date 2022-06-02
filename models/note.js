const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now()
    },
    content: String,
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

noteSchema.set("toJSON", {
    transform: (document, returnedNote) => {
        returnedNote.id = returnedNote._id;
        delete returnedNote._id;
        delete returnedNote.__v;
    }
});

module.exports = mongoose.model('Note', noteSchema);
