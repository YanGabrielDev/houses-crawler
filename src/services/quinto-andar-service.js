import { listHouses } from "../api/quinto-andar-api.js"
import { sendEmail } from "./send-email-service.js";
import { newHouse } from '../mock/housesMock.js'
import { houseModel } from '../models/houseModel.js'

/**
 * função principal do crawler que faz a busca dos apartamentos
 * @returns 
 */
export const housesCrawler = async () => {
    try {
        const houses = await listHouses();
        const savedHouses = await houseModel.getAllHouses()
        console.log("opa", savedHouses.rows);

        if (savedHouses) {
            await handlCheckSavedHouses({ houses: [...houses, newHouse], savedHouses: savedHouses.rows })
            return
        }

        if (houses) {
            houses?.map(async (house) => {
                const houseSource = house._source
                await houseModel.createHouse(houseSource)
            })
            console.log(`${houses.length} apartamentos encontrados`)
            console.log("Arquivo 'houses.json' salvo com sucesso.");
        }

        console.log("Busca realizada com sucesso");
    } catch (error) {
        console.error("Erro ao concluir busca:", error);
    }
};

/**
 * Verifica se algum apartamento novo foi encontrado na busca
 * @param {Array} houses Array de apartamentos encontrados na api
 * @param {Array} savedHouses Array de apartamentos armazenados na ultima busca
 */
const handlCheckSavedHouses = async ({ houses = [], savedHouses = [] }) => {
    const savedHouseids = savedHouses.map((item) => item.id)
    const newHouses = houses.filter(house => {
        return !savedHouseids.includes(house._source.id)
    }) || []

    if (newHouses.length > 0) {
        const houseslinks = newHouses.map(houses => `https://www.quintoandar.com.br/imovel/${houses?._id}/comprar`)
        await sendEmail(houseslinks)
        await houseModel.resetHouses()
        houses?.map(async (house) => {
            const houseSource = house._source
            await houseModel.createHouse(houseSource)
        })

    }
}