import express from 'express'
import {
  handleLogin,
  handleLogout,
  handleRegister,
} from '../controllers/auth.controllers.js'
import { authenticateUser } from '../middleware/authentication.js'
const router = express.Router()

router.post('/register', handleRegister)
router.post('/login', handleLogin)
router.post('/logout', handleLogout)
router.post('/me', authenticateUser, (req, res) => {
  if (req.user) res.json(req.user)
  else {
    return res.status(401).json({ message: 'You are not logged in.' })
  }
})

export default router
