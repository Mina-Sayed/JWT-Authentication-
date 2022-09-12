import express, { Request, Response } from 'express'

// create a instance of server

const app = express()

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello world🌎',
  })
})

const PORT = 3000

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`)
})

export default app
