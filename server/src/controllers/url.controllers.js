import shortid from 'shortid';
import urlModel from '../models/url.model.js';

const addUrl = async (req, res) => {
  const { url, customId } = req.body;

  if (!url)
    // if url is empty return
    return res.status(400).json({ msg: 'Please provide a valid url' });
  console.log(customId);
  let ID;
  if (customId) {
    let doc = await urlModel.findOne({ shortId: customId });
    if (doc) {
      return res.status(409).send('Custom ID already taken');
    }
    ID = customId;
  } else {
    ID = shortid();
  }
  const newDoc = await urlModel.create({
    shortId: ID,
    redirectURL: url.replace(/^https?:\/\//, ''),
    clicks: 0,
    visitHistory: [],
  });
  res.json({
    success: true,
    message: 'Short Url Created',
    data: {
      shortId: newDoc.shortId,
    },
  });
};

const handleUrlTrigger = async (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(400).send('Invalid Request: ShortId not found');
  const doc = await urlModel.findOneAndUpdate(
    { shortId: id },
    {
      $inc: { clicks: 1 },
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    },
    { new: true }
  );
  if (!doc) return res.status(404).send('No Record Found for this Short Id');

  return res.redirect(`http://${doc.redirectURL}`);
};

export { addUrl, handleUrlTrigger };
