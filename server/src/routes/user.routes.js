import express from 'express';
import { addUrl, getUrls } from '../controllers/user.controllers.js';
const router = express.Router();

router.post('/me', (req, res) => {
  if (req.user) res.json(req.user);
  else {
    return res.status(401).json({ message: 'You are not logged in.' });
  }
});
router.post('/addurl', addUrl);
router.get('/geturls', getUrls);

export default router;
