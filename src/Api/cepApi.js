const BASE_URL = 'https://viacep.com.br/ws/'
import axios from 'axios'

export default {

    checkCep: async (cep) => {
        try {
            const response = await axios.get(`${BASE_URL}/${cep}/json/`)
            return response
        } catch (error) {
            console.log(error)
        }
    }
}