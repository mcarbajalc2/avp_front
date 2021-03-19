import axios from 'axios'
import Config from './Config'

const url = `${Config.url}/ubicacion`

export default class Ubicacion{
    static async getDepartamentos(){
        const response = await axios.get(`${url}/departamento`)
        return response.data
    }

    static async getProvincias(id_departamento){
        const response = await axios.get(`${url}/provincia?id_departamento=${id_departamento}`)
        return response.data
    }

    static async getDistrito(id_provincia){
        const response = await axios.get(`${url}/distrito?id_provincia=${id_provincia}`)
        return response.data
    }

    static async getTiposVia(){
        const response = await axios.get(`${url}/tipo-via`)
        return response.data
    }
}