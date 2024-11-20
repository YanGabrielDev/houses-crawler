import Fastify from 'fastify'
import dotenv from 'dotenv'
import housesController from '../src/controllers/houses-controller.js'
dotenv.config()
const app = Fastify({
  logger: true,
})

app.get('/', housesController.houses)

// export default async function handler(req, reply) {
//   await app.ready()
//   app.server.emit('request', req, reply)
// }

app.listen({ port: 3000 }, function (err, address) {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})