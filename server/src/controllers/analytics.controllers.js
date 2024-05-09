import urlModel from "../models/url.model.js";

const getAnalytics = async (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(400).send("Invalid Request: ShortId not found");
  const doc = await urlModel.findOne({ shortId: id });
  if (!doc)
    return res.res.status(400).send("No Record Found for this Short Id");
  return res.json({
    totalClicks: doc.visitHistory.length,
    visitHistory: doc.visitHistory,
  });
};

export { getAnalytics };
