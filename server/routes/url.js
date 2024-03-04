const express = require("express");
const {
  handleGenerateNewCustomUrl,
  handleGenerateNewShortURL,
  handleGetAnalytics,
} = require("../controllers/url");

const router = express.Router();

router.post("/addurl", handleGenerateNewShortURL);
router.post("/addcustomurl", handleGenerateNewCustomUrl);

router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
