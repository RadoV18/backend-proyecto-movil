const weatherRouter = require("express").Router();
const config = require("../utils/config");
const http = require("http");

weatherRouter.post("/", async (req, res) => {
    const city = req.body.city;

    http.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=es&appid=${config.WEATHER_API_KEY}`, (response) => {
        let data = "";

        response.on("data", (chunk) => {
            data += chunk;
        });

        response.on("end", () => {
            const parsed = JSON.parse(data);
            res.json({
                "response": `En estos momentos, la temperatura en ${city} es de ${parsed.main.temp} grados Celsius con ${parsed.weather[0].description}.`
            });
        });
    })
    .on("error", (err) => {
        console.log("Error: " + err.message);
        return res.status(500).end();
    });
});

module.exports = weatherRouter;
