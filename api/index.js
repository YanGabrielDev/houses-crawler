import Fastify from 'fastify'
import { housesCrawler } from '../src/services/quinto-andar-service'

const app = Fastify({
  logger: true,
})

app.get('/', async (req, reply) => {
  await housesCrawler()
  return reply.status(200).send({ message: "complete" })
})

export default async function handler(req, reply) {
  await app.ready()
  app.server.emit('request', req, reply)
}

