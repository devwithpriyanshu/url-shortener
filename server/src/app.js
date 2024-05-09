import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import urlRoutes from './routes/url.routes.js'
import analyticsRoutes from './routes/analytics.routes.js'
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import { authenticateUser } from './middleware/authentication.js'

const app = express()
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  })
)
app.use(express.json())
app.use(cookieParser())

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

/* ---------------------- Routes ----------------------  */

app.get('/', (req, res, next) => {
  res.send('url shortener server')
})

app.use('/api/v1/url', urlRoutes)
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/analytics', authenticateUser, analyticsRoutes)
app.use('/api/v1/user', authenticateUser, userRoutes)

app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message || 'An error occurred.' })
})

export default app
