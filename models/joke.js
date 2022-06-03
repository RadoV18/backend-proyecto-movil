const mongoose = require('mongoose');

const jokeSchema = new mongoose.Schema({
    content: String
});

jokeSchema.set("toJSON", {
    transform: (document, returnedJoke) => {
        returnedJoke.id = returnedJoke._id;
        delete returnedJoke._id;
        delete returnedJoke.__v; 
    }
})

module.exports = mongoose.model('Joke', jokeSchema);
