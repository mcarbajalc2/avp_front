import axios from 'axios'
import Config from './Config'

const url = `${Config.url}/cotizacion`

export default class Cotizacion{

    static async add(cotizacion, id_negocio){
        const response = await axios.post(url, {cotizacion, id_negocio})
        return response.data
    }
}