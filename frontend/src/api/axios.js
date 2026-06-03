import axios from 'axios'

const API = axios.create({
  baseURL: 'https://examen-03-3oi4.onrender.com/api',
})

export default API