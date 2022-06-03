const notesRouter = require("express").Router();
const Note = require("../models/note");
const User = require("../models/user");

notesRouter.get("/user/:id", async (req, res) => {
    const user = await User.findById(req.params.id);
    if(!user) {
        return res.status(404).end();
    }

    const notes = await Note
        .find({"userId": req.params.id})
        .sort("date");
    res.json(notes);
});

notesRouter.delete("/user/:id/pos/:pos", async (req, res) => {
    const user = await User.findById(req.params.id);
    if(!user) {
        return res.status(404).end();
    }

    const notes = await Note
        .find({"userId": req.params.id})
        .sort("date");
    for(let i = 0; i < notes.length; notes++) {
        console.log(notes[i]);
        if(i + 1 === Number(req.params.pos)) {
            await Note.findByIdAndDelete(notes[i]._id.toString());
            break;
        }
    }
    res.status(204).end();
})

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
});

module.exports = notesRouter;
