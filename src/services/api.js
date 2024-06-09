import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000', // Certifique-se de que a porta está correta
});

export const fetchCompanyData = async (cnpj) => {
    try {
        const response = await api.post('/empresa', { cnpj });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar dados da empresa', error);
        throw error;
    }
};
