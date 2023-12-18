import { Express } from 'express'

import trucks from './trucks'

export default (app: Express) => {
  app.use('/api/trucks', trucks)
}
