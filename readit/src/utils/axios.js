import axios from 'axios'

const instance = axios.create({
    baseURL: "https://readit-backend.herokuapp.com"
})


export default instance
