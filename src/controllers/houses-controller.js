import { housesCrawler } from "../services/quinto-andar-service.js"

const houses = async (req, reply) => {
    const complete = await housesCrawler()
    return reply.status(200).send({ complete })
}
export default { houses }