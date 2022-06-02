const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    name: String,
    email: String,
    passwordHash: String
});

userSchema.set("toJSON", {
    transform: (document, returnedUser) => {
        returnedUser.id = returnedUser._id;
        delete returnedUser._id;
        delete returnedUser.__v;
        delete returnedUser.passwordHash;
    }
});

module.exports = mongoose.model('User', userSchema);
