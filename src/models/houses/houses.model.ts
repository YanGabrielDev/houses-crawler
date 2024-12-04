// import { turso } from '../db/tursoClient.js';

import { createClient } from "@libsql/client";
import dotenv from "dotenv";
import type { Houses } from "./houses.types.ts";
dotenv.config();

const turso = createClient({
  authToken: process.env.TURSO_AUTH_TOKEN,
  url: process.env.TURSO_DATABASE_URL ?? "",
});

// Função para adicionar uma nova casa
const createHouse = async (houseData: Houses) => {
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

const getAllHouses = async () => {
    try {
      const houses = await turso.execute(`SELECT * FROM houses`);
  
      // Aqui você garante que houses está tipado corretamente como um array de objetos do tipo House
      return houses ;
    } catch (error) {
      console.error("Erro ao buscar casas:", error);
      throw error;
    }
  };
// Função para buscar uma casa por ID
const getHouseById = async (id: number) => {
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

// Função para atualizar uma casa por ID
const updateHouse = async (id: number, newHouseData: Houses) => {
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

// Função para deletar uma casa por ID
const deleteHouse = async (id: number) => {
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
