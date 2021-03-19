import axios from 'axios'
import Config from './Config'

const url = `${Config.url}/empresa`

export default class Empresa{
    static async buscar(key){
        const response = await axios.get(`${url}?buscar=${key}`)
        return response.data
    }

    static async getTipos(){
        const response = await axios.get(`${url}/tipo`)
        return response.data
    }

    static async getCondicionDomicilio(){
        const response = await axios.get(`${url}/domicilio-condicion`)
        return response.data
    }

    static async getActividadComercial(){
        const response = await axios.get(`${url}/actividad-comercial`)
        return response.data
    }

    static async add(empresa){
        const response = await axios.post(url, empresa)
        return response.data
    }

    static async addContacto(contacto){
        const response = await axios.post(`${url}/contacto`, contacto)
        return response.data
    }
}