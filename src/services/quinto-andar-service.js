import { listHouses } from "../api/quinto-andar-api.js";
import { promises as fs } from 'fs';
import { getFileData } from "../utils/getFileData.js";
import { sendEmail } from "./send-email-service.js";
import { newHouse } from '../mock/housesMock.js';
import path from 'path';

// Define o caminho absoluto para o arquivo JSON
const filePath = path.resolve(__dirname, 'houses.json');

/**
 * Função principal do crawler que faz a busca dos apartamentos
 * @returns
 */
export const housesCrawler = async () => {
    try {
        const houses = await listHouses();

        // Verifica se o arquivo já existe e lê seu conteúdo
        let savedHouses = '';
        try {
            savedHouses = await getFileData(filePath);
        } catch (error) {
            console.log("Arquivo 'houses.json' não encontrado. Um novo será criado.");
        }

        const parsedSavedHouses = savedHouses ? JSON.parse(savedHouses) : [];
        const housesJson = JSON.stringify(houses);

        if (savedHouses) {
            await handlCheckSavedHouses({ houses: [...houses, newHouse], housesJson, parsedSavedHouses });
            return { new: [...houses, newHouse], save: parsedSavedHouses };
        }

        if (housesJson) {
            await fs.writeFile(filePath, housesJson);
            console.log(`${houses.length} apartamentos encontrados`);
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
    const newHouses = houses.filter(house => !parsedSavedHouses.some(savedHouse => savedHouse._id === house._id)) || [];

    if (newHouses.length > 0) {
        const houseLinks = newHouses.map(house => `https://www.quintoandar.com.br/imovel/${house?._id}/comprar`);
        await sendEmail(houseLinks);

        // Remove o arquivo existente e salva o novo
        await fs.unlink(filePath).catch(() => console.log("Nenhum arquivo anterior para remover."));
        await fs.writeFile(filePath, housesJson);
        console.log("Arquivo 'houses.json' atualizado com novos apartamentos.");
    }
};
