import { getUser } from '../utils/auth.js'
async function authenticateUser(req, res, next) {
  const auth_token = req.cookies?.auth_token
  if (!auth_token) next()
  try {
    const decoded = getUser(auth_token)
    if (!decoded) next()
    // console.log(decoded)
    req.isAuthenticated = true
    req.user = decoded
    next()
  } catch (e) {
    console.log('Error in cookie checking middleware', e)
  }
}

export { authenticateUser }
