import { createHousesTable } from "../db/turso.db.ts";

async function runMigrations() {
    try {
        await createHousesTable();
        console.log("Migrações concluídas com sucesso.");
    } catch (error) {
        console.error("Erro ao executar migrações:", error);
    }
}

runMigrations();
