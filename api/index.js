import Fastify from 'fastify'
import { housesCrawler } from '../src/services/quinto-andar-service.js'

const app = Fastify({
  logger: true,
})

app.get('/', async (req, reply) => {
  const complete = await housesCrawler()
  return reply.status(200).send({ complete })
})

export default async function handler(req, reply) {
  await app.ready()
  app.server.emit('request', req, reply)
}

