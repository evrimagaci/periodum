const { loadNuxt, build } = require('nuxt')
const consola = require('consola')
const app = require('express')()
const bodyParser = require('body-parser')
const helmet = require('helmet')
const compression = require('shrink-ray-current')
const timeout = require('connect-timeout')
const config = require('../nuxt.config.js')
const routes = require('./routes')
const dbConnection = require('./db_connection')
const DBHandler = require('./DBHandler')

const isDev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000
const host = '0.0.0.0'

config.dev = isDev

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(compression())

// eslint-disable-next-line no-constant-condition
if (!config.dev) {
  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  )
}

app.use(timeout(60000))

async function start() {
  // We get Nuxt instance
  const nuxt = await loadNuxt(isDev ? 'dev' : 'start')

  // Render every route with Nuxt.js
  app.use('/', routes)

  app.use(nuxt.render)

  // Build only in dev mode with hot-reloading
  if (isDev) {
    build(nuxt)
  }
  // Listen the server
  dbConnection
    .sync({ force: false })
    .then(() => DBHandler.getElements())
    .then(() => DBHandler.getIsotopes())
    .then(() => DBHandler.findAllCompounds())
    .then(() => {
      app.listen(port, host)
      consola.ready({
        message: `Server listening on http://${host}:${port}`,
        badge: true,
      })
    })
    .catch((err) => {
      consola.error('DB Tables could not be synced. Here is the error message:')
      // eslint-disable-next-line no-console
      console.error(err)
      process.exit(1)
    })
}

return start()
