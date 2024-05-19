import axios from 'axios';

// uma instância do axios com uma configuração baseURL para simplificar as chamadas de API
const api = axios.create({
  baseURL: 'https://careconnect-oy9k.onrender.com/api', // Base URL para as requisições
});

// Função para registrar um novo usuário
export const register = async (userData) => {
  return api.post('/auth/register', userData);
};

// Função para fazer login do usuário
export const login = async (userData) => {
  return api.post('/auth/login', userData);
};

export default api;