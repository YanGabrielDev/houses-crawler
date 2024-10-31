import { promises as fs } from 'fs'; // Usar promises do fs

export const getFileData = async (path = '') => {
    try {
        return await fs.readFile(path, 'utf8', (error, data) => {
            if (error) {
                console.log("erro ao ler o arquivo");
                return null
            }
            return data
        })
    } catch (error) {
        console.log("Arquivo não existente!");
        return null
    }
} 