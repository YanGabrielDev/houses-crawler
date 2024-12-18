/**
 * @module HousesService
 * @description Módulo para manipulação de dados na tabela "houses".
 */

import { createClient } from "@libsql/client";
import dotenv from "dotenv";

dotenv.config();

const turso = createClient({
  authToken: process.env.TURSO_AUTH_TOKEN,
  url: process.env.TURSO_DATABASE_URL ?? "",
});

/**
 * Adiciona uma nova casa à tabela "houses".
 * @async
 * @param {Houses} houseData - Dados da casa a serem inseridos.
 * @returns {Promise<object>} Resultado da operação de inserção.
 * @throws {Error} Se ocorrer um erro durante a inserção.
 */
const createHouse = async (houseData) => {
  const {
    id,
    type,
    area,
    bedrooms,
    salePrice,
    address,
    city,
    neighbourhood,
    regionName,
  } = houseData;

  try {
    const result = await turso.execute({
      sql: `INSERT INTO houses (id, type, area, bedrooms, salePrice, address, city, neighbourhood, regionName)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        id,
        type,
        area,
        bedrooms,
        salePrice,
        address,
        city,
        neighbourhood,
        regionName,
      ],
    });
    return result;
  } catch (error) {
    console.error("Erro ao adicionar casa:", error);
    throw error;
  }
};

/**
 * Retorna todas as casas da tabela "houses".
 * @async
 * @returns {Promise<Array<object>>} Lista de casas.
 * @throws {Error} Se ocorrer um erro durante a consulta.
 */
const getAllHouses = async () => {
  try {
    const houses = await turso.execute(`SELECT * FROM houses`);
    return houses;
  } catch (error) {
    console.error("Erro ao buscar casas:", error);
    throw error;
  }
};

/**
 * Busca uma casa pelo ID.
 * @async
 * @param {number} id - ID da casa a ser buscada.
 * @returns {Promise<object|null>} Dados da casa encontrada ou null se não encontrada.
 * @throws {Error} Se ocorrer um erro durante a consulta.
 */
const getHouseById = async (id) => {
  try {
    const house = await turso.execute({
      sql: `SELECT * FROM houses WHERE id = ?`,
      args: [id],
    });
    return house;
  } catch (error) {
    console.error("Erro ao buscar casa:", error);
    throw error;
  }
};

/**
 * Atualiza os dados de uma casa existente.
 * @async
 * @param {number} id - ID da casa a ser atualizada.
 * @param {Houses} newHouseData - Novos dados da casa.
 * @returns {Promise<object>} Resultado da operação de atualização.
 * @throws {Error} Se ocorrer um erro durante a atualização.
 */
const updateHouse = async (id, newHouseData) => {
  const {
    type,
    area,
    bedrooms,
    salePrice,
    address,
    city,
    neighbourhood,
    regionName,
  } = newHouseData;

  try {
    const result = await turso.execute({
      sql: `UPDATE houses
         SET type = ?, area = ?, bedrooms = ?, salePrice = ?, address = ?, city = ?, neighbourhood = ?, regionName = ?
         WHERE id = ?`,
      args: [
        type,
        area,
        bedrooms,
        salePrice,
        address,
        city,
        neighbourhood,
        regionName,
        id,
      ],
    });
    console.log("Casa atualizada com sucesso:", result);
    return result;
  } catch (error) {
    console.error("Erro ao atualizar casa:", error);
    throw error;
  }
};

/**
 * Deleta uma casa pelo ID.
 * @async
 * @param {number} id - ID da casa a ser deletada.
 * @returns {Promise<object>} Resultado da operação de exclusão.
 * @throws {Error} Se ocorrer um erro durante a exclusão.
 */
const deleteHouse = async (id) => {
  try {
    const result = await turso.execute({
      sql: `DELETE FROM houses WHERE id = ?`,
      args: [id],
    });
    console.log("Casa deletada com sucesso:", result);
    return result;
  } catch (error) {
    console.error("Erro ao deletar casa:", error);
    throw error;
  }
};

/**
 * Reseta a tabela "houses", deletando todos os registros.
 * @async
 * @returns {Promise<object>} Resultado da operação de reset.
 * @throws {Error} Se ocorrer um erro durante o reset.
 */
const resetHouses = async () => {
  try {
    const result = await turso.execute(`DELETE FROM houses`);
    console.log("Tabela resetada com sucesso:", result);
    return result;
  } catch (error) {
    console.error("Erro ao resetar a tabela:", error);
    throw error;
  }
};

export default {
  resetHouses,
  deleteHouse,
  createHouse,
  updateHouse,
  getAllHouses,
  getHouseById,
};
