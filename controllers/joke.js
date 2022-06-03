const jokeRouter = require('express').Router();
const Joke = require('../models/joke');

jokeRouter.get('/', async (req, res) => {
    const jokes = await Joke.find();
    const max = jokes.length;
    const index = Math.floor(Math.random() * max);
    res.json(jokes[index]);
});

jokeRouter.post("/", async (req, res) => {
    const data = req.body;
    const newJoke = new Joke({
        content: data.content
    });

    res.json(await newJoke.save());
});

module.exports = jokeRouter;