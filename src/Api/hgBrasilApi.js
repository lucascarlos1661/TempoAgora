const BASE_URL = 'https://api.hgbrasil.com/weather?key='
import axios from 'axios'

export default {

    checkWeather: async (cityName, state) => {
        try {
            const response = await axios.get(`${BASE_URL}07544d88%20&city_name=${cityName},${state}`)
            return response
        } catch (error) {
            console.log(error)
        }
    }
}