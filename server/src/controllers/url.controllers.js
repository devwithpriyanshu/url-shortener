import shortid from "shortid";
import urlModel from "../models/url.model.js";

const addUrl = async (req, res) => {
  const { url, customId } = req.body;

  if (!url)
    // if url is empty return
    return res.status(400).json({ msg: "Please provide a valid url" });

  if (customId) {
    // check whether the entered custom Id already exists or not
    let doc = await urlModel.findOne({ shortId: customId });
    if (doc) {
      return res.status(409).send("Custom ID already taken");
    }
    let newDoc = await urlModel.create({
      // if doc is null that means create a new document with custom short id
      shortId: customId,
      redirectURL: url.replace(/^https?:\/\//, ''),
      visitHistory: [],
    });
    return res.json({
      msg: "Custom URL Shortened",
      data: {
        shortId: newDoc.shortId,
      },
    });
  } else {
    // with bo customId create document with random short id
    const randomId = shortid();
    let newDoc = await urlModel.create({
      shortId: randomId,
      redirectURL: url.replace(/^https?:\/\//, ''),
      visitHistory: [],
    });
    res.json({
      success: true,
      message: "Short Url Created",
      data: {
        shortId: newDoc.shortId,
      },
    });
  }
};

const handleUrlTrigger = async (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(400).send("Invalid Request: ShortId not found");
  const doc = await urlModel.findOneAndUpdate(
    { shortId: id },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    },
    { new: true },

  );
  if (!doc) return res.status(404).send("No Record Found for this Short Id");

  return res.redirect(`http://${doc.redirectURL}`);
};

export { addUrl, handleUrlTrigger };
