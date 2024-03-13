import express from 'express'
import { getAnalytics } from '../controllers/analytics.controllers.js';

const router  = express.Router();

router.get('/:id', getAnalytics)

export default router;