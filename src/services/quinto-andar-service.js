import { listHouses } from "../api/quinto-andar-api.js"
import { promises as fs } from 'fs';
import { getFileData } from "../utils/getFileData.js";
import { sendEmail } from "./send-email-service.js";
import { newHouse } from '../mock/housesMock.js'
/**
 * função principal do crawler que faz a busca dos apartamentos
 * @returns 
 */
export const housesCrawler = async () => {
    try {
        const houses = await listHouses();
        const savedHouses = await getFileData('houses.json')
        const parsedSavedHouses = JSON.parse(savedHouses)
        const housesJson = JSON.stringify(houses);

        if (savedHouses) {
            await handlCheckSavedHouses({ houses: [...houses, newHouse], housesJson, parsedSavedHouses })
            return
        }

        if (housesJson) {
            await fs.writeFile('houses.json', housesJson);
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
 * @param {string} housesJson Json de apartamentos encontrados na api
 * @param {Array} parsedSavedHouses Array de apartamentos armazenados na ultima busca
 */
const handlCheckSavedHouses = async ({ houses = [], housesJson = '', parsedSavedHouses = [] }) => {
    const newHouses = houses.filter(house => !parsedSavedHouses.some(savedHouses => savedHouses._id === house._id)) || []
    if (newHouses.length > 0) {
        const houseslinks = newHouses.map(houses => `https://www.quintoandar.com.br/imovel/${houses?._id}/comprar`)
        await sendEmail(houseslinks)
        await fs.unlink('houses.json')
        await fs.writeFile('houses.json', housesJson);

    }
}