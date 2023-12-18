/* Library code */
import express, { Express, Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'

/* Application code */
import mountRoutes from './routes'

const app: Express = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use(helmet())
mountRoutes(app);

app.get('/ping', (req: Request, res: Response) => {
  res.json({ message: 'Hello World!' })
})

export default app