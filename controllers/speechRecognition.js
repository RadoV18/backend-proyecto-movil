const speechRouter = require("express").Router();

// Google Cloud client library
const speech = require("@google-cloud/speech");
const client = new speech.SpeechClient();

speechRouter.post("/", async (req, res) => {
    const { content, config } = req.body;
    const audio = { content };
    const request = { audio, config };
    const [response] = await client.recognize(request);
    const transcription = response.results
        .map((result) => result.alternatives[0].transcript)
        .join("\n");
    const resObj = { transcription };
    res.json(resObj);
});

module.exports = speechRouter;
