import express, { Request, Response } from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import RateLimit from 'express-rate-limit'
import errorMiddleware from './middleware/error.middleware'
import config from './config'
import db from './database'
// create a instance of server
const PORT = config.port || 3000

const app = express()

const rateLimit = RateLimit({
  windowMs: 60 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headerss
  message: 'Too many requests from this IP, please try again after an hour.',
})

// HTTP Loger Middleware
app.use(morgan('dev'))

//  Security Middleware
app.use(helmet())

// Parsing Middleware incoming Request Handler
app.use(express.json())

app.use(rateLimit)

app.get('/', (req: Request, res: Response) => {
  throw new Error('Not implemented')
  res.json({
    message: 'Hello world🌎',
  })
})

app.post('/', (req: Request, res: Response) => {
  console.log(req.body)

  res.json({
    message: 'Hello world🌎 Response',
    data: req.body,
  })
})

app.use(errorMiddleware)

db.connect().then((client) => {
  return client
    .query('SELECT NOW()')
    .then((res) => {
      client.release()
      console.log(res.rows)
    })
    .catch((err) => {
      client.release()
      console.log(err.stack)
    })
})

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    message:
      'Ohh You are lost , Read the API Documentation! to find more information 😂',
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`)
})

export default app
