const newsRouter = require("express").Router();
const NewsAPI = require("newsapi");
const config = require("../utils/config");

newsRouter.get("/:query", async (req, res) => {
    const newsapi = new NewsAPI(config.NEWS_API_KEY);
    const news = await newsapi.v2.everything({
        q: req.params.query,
        language: 'es',
        sortBy: 'publishedAt',
        searchIn: 'title',
        pageSize: 1
    });

    res.json(news);
});

module.exports = newsRouter;
