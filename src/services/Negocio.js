import axios from 'axios'
import Config from './Config'

const url = `${Config.url}/negocio`

export default class Empresa{

    static async add(id_empresa, id_persona_contacto){
        const response = await axios.post(url, {id_empresa, id_persona_contacto})
        return response.data
    }

    static async addContacto(contacto){
        const response = await axios.post(`${url}/contacto`, contacto)
        return response.data
    }

    static async get(){
        const response = await axios.get(url)
        return response.data
    }
}