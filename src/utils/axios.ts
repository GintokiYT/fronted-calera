import axios from 'axios';

const caleraAxios = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': 'Bearer token' // puedes agregar esto dinámicamente
  }
});

export default caleraAxios;