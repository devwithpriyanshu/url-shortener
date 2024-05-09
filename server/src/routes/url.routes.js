import express from 'express'
import { addUrl, handleUrlTrigger } from '../controllers/url.controllers.js'
const router = express.Router()

router.post('/addurl', addUrl)
router.get('/:id', handleUrlTrigger)

export default router
