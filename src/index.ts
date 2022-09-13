import express, { Request, Response } from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import errorMiddleware from './middleware/error.middleware'
import config from './config'
import routes from './routes'
// create a instance of server
const PORT = config.port || 3000

const app = express()

// HTTP Loger Middleware
app.use(morgan('dev'))

//  Security Middleware
app.use(helmet())

// Parsing Middleware incoming Request Handler
app.use(express.json())

app.use('/api', routes)

app.use(errorMiddleware)

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`)
})

export default app
