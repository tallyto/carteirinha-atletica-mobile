import axios from 'axios'

const api = axios.create({
    baseURL: "http://10.72.140.246:3001"
})

export default api