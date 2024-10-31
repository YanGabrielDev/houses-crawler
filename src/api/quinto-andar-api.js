import { QUINTO_ANDAR_API } from "../config/apis.js";
import { postBody } from "../config/post-body.js";

export const listHouses = async () => {
    try {
        console.log("Iniciando a busca...");

        // Realiza a requisição POST
        const response = await fetch(QUINTO_ANDAR_API, {
            method: "POST",
            body: JSON.stringify(postBody),
            headers: { 'Content-Type': 'application/json' } // Adiciona cabeçalhos se necessário
        });

        // Transforma a resposta em JSON
        const data = await response.json();

        // Extração de dados relevantes
        const houses = data.hits.hits.map(item => item);


        return houses

    } catch (error) {
        console.error("Erro ao concluir busca:", error);
    }
};
