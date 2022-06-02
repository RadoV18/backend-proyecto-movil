const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

usersRouter.get("/", async (req, res) => {
    res.json(await User.find({}));
});

usersRouter.post("/", async (req, res) => {
    const data = req.body;

    const salt = 10;
    const passwordHash = await bcrypt.hash(data.password, salt);

    const newUser = new User({
        username: data.username,
        name: data.name,
        email: data.email,
        passwordHash
    });
    try {
        const savedUser = await newUser.save();
        res.json(savedUser);
    } catch (err) {
        res.status(400).json({"message": "El usuario ingresado ya se encuentra registrado."});
    }
    
    
});

module.exports = usersRouter;
