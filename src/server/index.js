import express from 'express'
import bodyParser from 'body-parser'
import route from 'server/middlewares/route'
import userAgent from 'server/middlewares/userAgent'
import cleanUrl from 'server/middlewares/cleanUrl'
import graphql from 'server/apis/graphql'

import morgan from 'morgan'
const port = process.env.PORT || 4001

const app = express()
app.use('/favicon.ico', (req, res) => res.send(''))
app.use(morgan('dev'))
app.use(userAgent)

app.use(cleanUrl)

app.use(bodyParser.json())
graphql(app)
app.use((req, res, next) => {
  res.locals.path = req.path
  next()
})

app.use(route)

app.listen(port, () => {
  console.log(`Server started on PORT ${port}`)
})

export default app
