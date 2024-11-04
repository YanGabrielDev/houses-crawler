// import { turso } from '../db/tursoClient.js';

import { createClient } from "@libsql/client";
import dotenv from 'dotenv'
dotenv.config()

const turso = createClient({
    authToken: process.env.TURSO_AUTH_TOKEN,
    url: process.env.TURSO_DATABASE_URL,
});
export const houseModel = {
    // Função para adicionar uma nova casa
    async createHouse(houseData = { id, type, area, bedrooms, salePrice, address, city, neighbourhood, regionName }) {
        const { id, type, area, bedrooms, salePrice, address, city, neighbourhood, regionName } = houseData;

        try {
            const result = await turso.execute(
                `INSERT INTO houses (id, type, area, bedrooms, salePrice, address, city, neighbourhood, regionName)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [id, type, area, bedrooms, salePrice, address, city, neighbourhood, regionName]
            );
            return result;
        } catch (error) {
            console.error("Erro ao adicionar casa:", error);
            throw error;
        }
    },

    // Função para buscar todas as casas
    async getAllHouses() {
        try {

            const houses = await turso.execute(`SELECT * FROM houses`);

            return houses;
        } catch (error) {
            console.error("Erro ao buscar casas:", error);
            throw error;
        }
    },

    // Função para buscar uma casa por ID
    async getHouseById(id) {
        try {
            const house = await turso.execute(`SELECT * FROM houses WHERE id = ?`, [id]);
            return house;
        } catch (error) {
            console.error("Erro ao buscar casa:", error);
            throw error;
        }
    },

    // Função para atualizar uma casa por ID
    async updateHouse(id, newHouseData) {
        const { type, area, bedrooms, salePrice, address, city, neighbourhood, regionName } = newHouseData;

        try {
            const result = await turso.execute(
                `UPDATE houses
         SET type = ?, area = ?, bedrooms = ?, salePrice = ?, address = ?, city = ?, neighbourhood = ?, regionName = ?
         WHERE id = ?`,
                [type, area, bedrooms, salePrice, address, city, neighbourhood, regionName, id]
            );
            console.log("Casa atualizada com sucesso:", result);
            return result;
        } catch (error) {
            console.error("Erro ao atualizar casa:", error);
            throw error;
        }
    },

    // Função para deletar uma casa por ID
    async deleteHouse(id) {
        try {
            const result = await turso.execute(`DELETE FROM houses WHERE id = ?`, [id]);
            console.log("Casa deletada com sucesso:", result);
            return result;
        } catch (error) {
            console.error("Erro ao deletar casa:", error);
            throw error;
        }
    },

    async resetHouses() {
        try {
            const result = await turso.execute(`DELETE FROM houses`);
            console.log("Tabela resetada com sucesso:", result);
            return result;
        } catch (error) {
            console.error("Erro ao resetar a tabela:", error);
            throw error;
        }
    }
};
