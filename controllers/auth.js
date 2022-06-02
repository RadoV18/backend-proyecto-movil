const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../utils/config');

const authRouter = require('express').Router();
const User = require('../models/user');

authRouter.post('/', async (req, res) => {
    const data = req.body;

    const user = await User.findOne({ username: data.username });
    const isPasswordCorrect = user === null
        ? false
        : await bcrypt.compare(data.password, user.passwordHash);

    if(!(user && isPasswordCorrect)) {
        return res.status(401).json({
            error: 'Usuario y/o contraseña incorrectos.'
        });
    }
    
    const userForToken = {
        username: user.username,
        id: user.id
    }

    const token = jwt.sign(
        userForToken,
        config.SECRET_KEY,
        { expiresIn: 8 * 60 * 60 } // Token expires in 8 hours
    );

    res.status(200)
        .send({
            token,
            username: user.username,
            name: user.name,
            id: user.id
        });
});

module.exports = authRouter;
