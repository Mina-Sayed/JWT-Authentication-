import express, { Request, Response } from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import  RateLimit  from 'express-rate-limit'
// create a instance of server

const app = express()


const rateLimit = RateLimit({
  windowMs: 60 * 1000, // 15 minutes
  max: 2, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headerss
  message: 'Too many requests from this IP, please try again after an hour.'
});



// HTTP Loger Middleware
app.use(morgan('dev'))

//  Security Middleware
app.use(helmet())

// Parsing Middleware incoming Request Handler
app.use(express.json());

app.use(rateLimit);




app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello world🌎',
  })
});


app.post('/', (req: Request, res: Response) => {

  console.log(req.body);
  
  res.json({
    message: 'Hello world🌎 Response',
  })
});


const PORT = 3000

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`)
})

export default app
