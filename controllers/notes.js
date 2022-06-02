const notesRouter = require("express").Router();
const Note = require("../models/note");
const User = require("../models/user");

notesRouter.get("/:id", async (req, res) => {
    const user = await User.findById(req.params.id);
    if(!user) {
        return res.status(404).end();
    }

    const notes = await Note.find({"userId": req.params.id});
    res.json(notes);
});

notesRouter.post("/new/:id", async (req, res) => {
    const user = await User.findById(req.params.id);
    if(!user) {
        return res.status(404).end();
    }

    const data = req.body;
    const newNote = new Note({
        content: data.content,
        userId: req.params.id,
    });

    const savedNote = await newNote.save();
    res.json(savedNote);
})

module.exports = notesRouter;
