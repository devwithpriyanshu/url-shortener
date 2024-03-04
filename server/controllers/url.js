const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewCustomUrl(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  if (!body.customId)
    return res.status(400).json({ error: "custom url is required" });
  const result = await URL.findOne({ shortId: body.customId });

  //if the custom id already exists in database then generate a new one and check again
  if (result) {
    return res.status(200).json({ message: "custom url taken" });
  }
  const newUrl = await URL.create({
    shortId: body.customId,
    redirectURL: body.url,
    visitHistory: [],
  });
  if (!newUrl)
    return res.send(
      "something wrong with creating this customurl maybe too long"
    );
  return res.json({ customId: newUrl.shortId });
}

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const shortID = shortid();

  const newUrl = await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });

  return res.json({ shortId:newUrl.shortId});
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handleGenerateNewCustomUrl,
  handleGenerateNewShortURL,
  handleGetAnalytics,
};
