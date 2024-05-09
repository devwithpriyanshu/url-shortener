import User from '../models/user.model.js'
import { setUser } from '../utils/auth.js'
import {
  generatePasswordHash,
  validatePassword,
} from '../utils/password.utils.js'

async function handleRegister(req, res) {
  const saltHash = generatePasswordHash(req.body.password)

  const salt = saltHash.salt
  const hash = saltHash.hash

  const user = await User.findOne({ email: req.body.email }).exec()
  if (user) return res.status(403).send('Email already in use')

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    passwordHash: hash,
    passwordSalt: salt,
  })
  newUser.save()
  return res.status(200).send('user created')
}

async function handleLogin(req, res) {
  const user = await User.findOne({ email: req.body.email }).exec()
  if (!user) return res.status(404).send('User not found')
  const passwordMatch = validatePassword(
    req.body.password,
    user.passwordHash,
    user.passwordSalt
  )
  if (!passwordMatch) return res.status(401).send('Wrong credentials.')
  const auth_token = setUser(user)
  res.cookie('auth_token', auth_token)
  return res.status(200).send('Cookie has been set!')
}
async function handleLogout(req, res) {
  if (!req.cookies.auth_token)
    return res.status(401).send('You are not logged in')
  res.clearCookie('auth_token')
  return res.status(200).send('Logged out')
}




export { handleLogin, handleRegister, handleLogout }
