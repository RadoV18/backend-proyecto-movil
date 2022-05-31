require('dotenv').config();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const SECRET_KEY = process.env.SECRET_KEY;

module.exports = {
    MONGODB_URI,
    PORT,
    WEATHER_API_KEY,
    SECRET_KEY
};
