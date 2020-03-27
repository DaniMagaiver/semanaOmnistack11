//O axios serve para realizar chamadas http
import axios from 'axios';

//A base URL é o caminho que se mantém em todas as chamadas
const api = axios.create({
    baseURL: 'http://localhost:3333',
});

export default api;