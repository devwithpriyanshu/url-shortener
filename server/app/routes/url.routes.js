import express from 'express'
import { addUrl, handleUrlTrigger } from '../controllers/url.controllers.js'
const router = express.Router()



router.post('/addurl', addUrl)
router.get('/:id', handleUrlTrigger)

export default router;


/* ROUTES REQUIRED */
//  '/', ()=> console.log(api home route)
//  '/addquickurl'                  generate a shortened url with random shortId, add it to the database and return the new shortened url
//  '/addcustomurl'                 generate a shortened url with custom shortId, add it to the database and return the new shortened url
//  '/analytics/:id'                return analytics for a shortened url with given shortId