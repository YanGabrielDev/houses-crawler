import { createClient } from "@libsql/client";

// Criação do cliente Turso
export const turso = createClient({
    url: process.env.TURSO_DATABASE_URL ?? 's',
    authToken: process.env.TURSO_AUTH_TOKEN,
});


// Função para criar a tabela "houses"
export async function createHousesTable() {
    try {
        await turso.execute(`
      CREATE TABLE IF NOT EXISTS houses (
        id INT,
        type VARCHAR(255),
        area INT,
        bedrooms INT,
        salePrice INT,
        address VARCHAR(255),
        city VARCHAR(255),
        neighbourhood VARCHAR(255),
        regionName VARCHAR(255)
      )
    `);
        console.log("Tabela 'houses' criada com sucesso!");
    } catch (error) {
        console.error("Erro ao criar a tabela 'houses':", error);
    }
}
