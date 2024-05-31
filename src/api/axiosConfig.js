// Importa a biblioteca axios
import axios from 'axios';

// Instância do axios com configuração personalizada
const axiosInstance = axios.create({
  // URL para todas as requisições HTTP
  baseURL: 'http://localhost:3000',
  // Define os cabeçalhos padrão para todas as requisições HTTP
  headers: {
    'Content-Type': 'application/json', // Conteúdo das requisições será no formato JSON
  },
});


// Exporta a instância do axios como padrão
export default axiosInstance;