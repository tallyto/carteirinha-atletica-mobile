import axios from 'axios'

const api = axios.create({baseURL: "https://carteirinha-atletica.herokuapp.com"})

export default api