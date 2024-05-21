import shortid from 'shortid';
import userModel from '../models/user.model.js';
import urlModel from '../models/url.model.js';

const addUrl = async (req, res) => {
  try {
    if (req.user === undefined) {
      throw new Error(403, 'Unauthorized');
    }
    const { email } = req.user;
    const { url, customId } = req.body;
    if (!url)
      // if url is empty return
      return res.status(400).json({ msg: 'Please provide a valid url' });
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
    const user = await userModel
      .findOneAndUpdate({ email: email }, { $push: { urls: newDoc._id } })
      .exec();
    res.status(201).json(newDoc);
  } catch (error) {
    console.log('Error in adding URL', error);
    return res.status(500).json({ msg: 'Server Error' });
  }
};

const getUrls = async (req, res) => {
  try {
    if (req.user === undefined) {
      throw new Error(401, 'Unauthorized');
    }
    const { email } = req.user;
    const user = await userModel
    .findOne({ email: email })
    .populate('urls')
    .exec();
    if (!user.urls) {
      return res.status(200).json([]);
    }
    res.status(200).json(user.urls);
    // console.log(user.urls[0].createdAt)
  } catch (error) {
    return res.send(error);
  }
};

export { addUrl, getUrls };
