import axios from 'axios'
import Config from './Config'

const url = `${Config.url}/servicio`

export default class Servicio{

    static async get(){
        const response = await axios.get(`${url}`)
        return response.data
    }
}