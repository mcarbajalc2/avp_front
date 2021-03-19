import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap'
import './App.css'

import TopBar from './components/TopBar'
import NavBar from './components/NavBar'
import Content from './components/Content'
import Table from './components/Table'
import Footer from './components/Footer'
import SideBar from './components/SideBar'
import NuevoNegocio from './components/NuevoNegocio'
import CotizacionAside from './components/CotizacionAside'

import Negocio from './services/Negocio'
import Cotizacion from './services/Cotizacion'


export default class App extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            // content: this.getContent(),
            asideTitle: 'Nuevo Negocio',
            title: 'Negocios',
            subTitle: 'Inicio | CRM | Negocios',
            buttonText: 'NUEVO NEGOCIO',
            module: {
                name: 'negocio',
                value: undefined
            },
            cotizacion: {
                items: []
            },        
            negocios: []    
        }

        this.handleFinish = this.handleFinish.bind(this)
        this.handleAddItem = this.handleAddItem.bind(this)
        this.handleSave = this.handleSave.bind(this)
        this.handleClickCotizar = this.handleClickCotizar.bind(this)

        this.obtenerNegocios()
    }

    handleFinish(module, id_negocio){

        this.setState({
            title: 'Nueva Cotización',
            subTitle: '',
            buttonText: undefined,
            asideTitle: 'Nombre de empresa',
            module: {
                name: 'cotizacion',
                value: {
                    id_negocio
                }
            }
            
        })
    }

    handleSave(){
        this.obtenerNegocios()
    }

    handleAddItem(item){
        const subtotal = [...this.state.cotizacion.items, item].reduce((A, B) => A + (B.precio * B.cantidad), 0)
        this.setState({
            cotizacion: {
                items: [
                    ...this.state.cotizacion.items,
                    {
                        ...item,
                        importe: item.cantidad * item.precio
                    }
                ],
                sub_total: subtotal.toFixed(2),
                igv: subtotal.toFixed(2) * 0.18,
                total: subtotal * 1.18
            }
        })
        // console.log(item)
    }

    getAsideContent(){
        let component = <div></div>
        switch (this.state.module.name) {
            case 'negocio':
                component = <NuevoNegocio onSave={this.handleSave} onFinish={this.handleFinish} />
                break;

            case 'cotizacion':
                component = <CotizacionAside onAddItem={this.handleAddItem}/>
                break;
        
            default:
                break;
        }        
        return component
    }

    getContent() {
        let component = <div></div>
        switch (this.state.module.name) {
            case 'negocio':
                component = this.getNegocioContent()     
                break;

            case 'cotizacion':
                component = this.getCotizacionContent() 
                break;
        
            default:
                break;
        }
        return component
    }

    async handleClickCotizar(){
        const data = {
            cotizacion: this.state.cotizacion.items,
            id_negocio: this.state.module.value.id_negocio
        }
        const response = await Cotizacion.add(data.cotizacion, data.id_negocio)
        console.log(response)
    }

    getCotizacionContent(){
        console.log(this.state.items)
        const headers = [
            {content: 'Ubicación'}, 
            {content: 'Cantidad'}, 
            {content: 'Producto'},
            {content: 'Precio U.'},
            {content: 'Importe'}
        ]
        const content = (
            <div>
                <Table headers={headers} dataPk={'idx'} data={this.state.cotizacion.items} cellKeys={['descripcion_ubicacion', 'cantidad', 'abreviatura', 'precio', 'importe']} />
                <div className="position-fixed bottom-0 start-0 w-100  mb-4" style={{
                        padding: "0 340px 0 410px"                        
                    }}>
                    <div className="bg-white px-3 py-2 d-flex justify-content-between align-items-end" style={{
                        boxShadow: "0px 3px 30px rgba(0, 0, 0, 0.04)"
                    }}>
                        <div className="d-flex">
                            <div className="form-group me-2">
                                <label>SUB TOTAL</label>
                                <input type="number" className="form-control" placeholder="" value={this.state.cotizacion.sub_total || ''} disabled={true} />
                            </div>
                            <div className="form-group me-2">
                                <label>I.G.V.</label>
                                <input type="number" className="form-control" placeholder="" value={this.state.cotizacion.igv || ''} disabled={true} />
                            </div>
                            <div className="form-group me-2">
                                <label>TOTAL</label>
                                <input type="number" className="form-control" placeholder="" value={this.state.cotizacion.total || ''} disabled={true} />
                            </div>
                        </div>
                        <button className="btn btn-lg btn-primary" onClick={this.handleClickCotizar}>COTIZAR</button>        
                    </div>
                                              
                </div>
            </div>            
        )

        return content
        // return <div></div>
    }

    getNegocioContent(){
        // const headers = [{content: 'Código'}, {content: 'Descripción'}, {content: 'Cliente'}, {content: 'Fecha de Registro'},{content: 'Etapa'}]
        const headers = [{content: 'Código'}, {content: 'Cliente'}, {content: 'Fecha de Registro'},{content: 'Etapa'}]
        // const data = [
        //     {id_negocio: '0001', descripcion: 'Camaras Lurin', cliente: 'TL Solutions Perú S.A.C.', fecha_registro: '23/11/2020 23:42:24', etapa: 'Cotización'},
        //     {id_negocio: '0002', descripcion: 'Camaras Lurin', cliente: 'TL Solutions Perú S.A.C.', fecha_registro: '23/11/2020 23:42:24', etapa: 'Cotización'},
        //     {id_negocio: '0003', descripcion: 'Camaras Lurin', cliente: 'TL Solutions Perú S.A.C.', fecha_registro: '23/11/2020 23:42:24', etapa: 'Cotización'},
        //     {id_negocio: '0004', descripcion: 'Camaras Lurin', cliente: 'TL Solutions Perú S.A.C.', fecha_registro: '23/11/2020 23:42:24', etapa: 'Cotización'},
        //     {id_negocio: '0005', descripcion: 'Camaras Lurin', cliente: 'TL Solutions Perú S.A.C.', fecha_registro: '23/11/2020 23:42:24', etapa: 'Cotización'},
        //     {id_negocio: '0006', descripcion: 'Camaras Lurin', cliente: 'TL Solutions Perú S.A.C.', fecha_registro: '23/11/2020 23:42:24', etapa: 'Cotización'},
        //     {id_negocio: '0007', descripcion: 'Camaras Lurin', cliente: 'TL Solutions Perú S.A.C.', fecha_registro: '23/11/2020 23:42:24', etapa: 'Cotización'},
        //     {id_negocio: '0008', descripcion: 'Camaras Lurin', cliente: 'TL Solutions Perú S.A.C.', fecha_registro: '23/11/2020 23:42:24', etapa: 'Cotización'},
        //     {id_negocio: '0009', descripcion: 'Camaras Lurin', cliente: 'TL Solutions Perú S.A.C.', fecha_registro: '23/11/2020 23:42:24', etapa: 'Cotización'},
        //     {id_negocio: '0010', descripcion: 'Camaras Lurin', cliente: 'TL Solutions Perú S.A.C.', fecha_registro: '23/11/2020 23:42:24', etapa: 'Cotización'}            
        // ];
        // const content = <Table headers={headers} dataPk={'id_negocio'} data={this.state.negocios} cellKeys={['id_negocio', 'descripcion', 'cliente', 'fecha_registro', {type: 'badge', key:'etapa'}]} />
        const content = <Table headers={headers} dataPk={'id_negocio'} data={this.state.negocios} cellKeys={['id_negocio', 'razon_social', 'fecha_registro', {type: 'badge', key:'etapa'}]} />

        return content
    }

    async obtenerNegocios(){
        const response = await Negocio.get()
        this.setState({
            negocios: response.results
        })
    }

    render() {
        const footer =  this.state.module.name === 'cotizacion' ? '' : <Footer /> 
        return (
            <div className="side-show">                
                <NavBar/>
                <SideBar title={this.state.asideTitle}>
                    {this.getAsideContent()}
                </SideBar>
                <TopBar/>
                <Content
                    title={this.state.title}
                    subTitle={this.state.subTitle}
                    buttonText={this.state.buttonText}
                >
                    {this.getContent()}
                </Content>                
                { footer }
            </div>
        )
    }
}