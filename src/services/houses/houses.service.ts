import { QUINTO_ANDAR_API } from "../../config/apis.config.ts";
import type { HousesResponse } from "./houses.types.ts";
import houseModel from '../../models/houses/houses.model.ts'
import { postBody } from "../../config/postBody/post-body.config.ts";
import { sendEmail } from "../email/email.service.ts";
import type { Row } from "@libsql/client";
import type { Houses } from "../../types/houses.types.ts";


/**
 * @returns {Promise<HousesResponse[]>} retorna as casas/apartamentos encontrados na busca
 */

 const listHouses = async (): Promise<HousesResponse[]> => {
    try {
        console.log("Iniciando a busca...");

        // Realiza a requisição POST
        const response = await fetch(QUINTO_ANDAR_API, {
            method: "POST",
            body: JSON.stringify(postBody(
                { 
                    businessContext: "SALE",
                    maxPrice: 200000,
                    minPrice: 150000,
                    coordinateLat: -19.916681,
                    coordinateLng: -43.934493
                }
            )),
            headers: { 'Content-Type': 'application/json' } 
        });

        // Transforma a resposta em JSON
        const data = await response.json();

        // Extração de dados relevantes
        const houses = data.hits.hits.map(item => item);


        return houses

    } catch (error) {
        console.error("Erro ao concluir busca:", error);
        throw error
    }
};  

/**
 * @param {HousesResponse[]} houses Salva casa/apartamento no banco
 * @returns 
 */
const saveHouses = async (houses: HousesResponse[]): Promise<void> => {
    for (const house of houses) {
          const houseSource = house._source
        await houseModel.createHouse(houseSource)
    }
}

/**
 * função principal do crawler que faz a busca dos apartamentos
 * @returns 
 */
export const housesCrawler = async () => {
    try {
        const houses = await listHouses();
        const savedHouses = await houseModel.getAllHouses()
        if (savedHouses) {
            const newHouses = houses
            await handlCheckSavedHouses( newHouses, savedHouses.rows )
            return
        }

        if (houses) {
            saveHouses(houses)
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
const handlCheckSavedHouses = async ( houses: HousesResponse[], savedHouses: Houses[] | Row[] ) => {

    const savedHouseids = savedHouses.map((item) => item.id)
    const newHouses = houses.filter(house => {
        return !savedHouseids.includes(house._source.id)
    }) || []
    console.log("difentes", newHouses.length);

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

