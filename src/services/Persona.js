import axios from 'axios'
import Config from './Config'

const url = `${Config.url}/persona`

export default class Persona{

    static async getTipoDocumentoIdentidad(){
        const response = await axios.get(`${url}/tipo-documento-identidad`)
        return response.data
    }

    static async getPersonaRelacion(){
        const response = await axios.get(`${url}/relacion`)
        return response.data
    }

    static async getContactos(id_persona){
        const response = await axios.get(`${url}/contacto?id_persona=${id_persona}`)
        return response.data
    }
}