const jwt = require('jsonwebtoken');

const tokenExtractor = (req, res, next) => {
    console.log("token extractor");
    const authorization = req.get('authorization');
    if(authorization && authorization.toLowerCase().startsWith('bearer')) {
        req.token = authorization.substring(7);
    }
    next();
};

const userExtractor = (req, res, next) => {
    if(!req.token) {
        return res.status(401).json({
            error: 'invalid or missing token'
        });
    }
    const token = req.token;
    const objectFromToken = jwt.verify(token, process.env.SECRET_KEY);

    if(!objectFromToken.id) {
        return res.status(401).json({
            error: 'invalid or missing token'
        });
    }

    req.user = objectFromToken;
    next();
};

module.exports = {
    tokenExtractor,
    userExtractor
};
