const BASE_API = 'https://viacep.com.br/ws/'

export default {

    checkCep: async (cep) => {
        try {
            let response = await fetch(`${BASE_API}/${cep}/json/`)
            let json = await response.json()
            return json
        } catch (error) {
            console.log(error)
        }
    }
}