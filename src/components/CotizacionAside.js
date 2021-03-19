import React from 'react'
import SelectSearch from './SelectSearch'
import Ubicacion from '../services/Ubicacion'
import Servicio from '../services/Servicio'

export default class CotizacionAside extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            nuevo_registro: { 
                id_departamento_ubicacion: 15,
                id_provincia_ubicacion: 128
            },
            departamentos: [],
            provincias: [],
            distritos: [],
            tipos_via: [],
            productos: [],
            cotizacion: {
                items: []
            }
        }
        
        this.handleChangeDepartamento = this.handleChangeDepartamento.bind(this)
        this.handleChangeProvincia = this.handleChangeProvincia.bind(this)
        this.handleChangeDistrito = this.handleChangeDistrito.bind(this)
        this.handleChangeTipoVia = this.handleChangeTipoVia.bind(this)
        this.handleChangeVía = this.handleChangeVía.bind(this)
        this.handleChangeNumeroVia = this.handleChangeNumeroVia.bind(this)
        this.handleChangeDescripcion = this.handleChangeDescripcion.bind(this)
        this.handleChangeProducto = this.handleChangeProducto.bind(this)
        this.handleChangeCantidad = this.handleChangeCantidad.bind(this)
        this.handleAddItem = this.handleAddItem.bind(this)

        this.mostrarDepartamentos()
        this.mostrarTiposVia()
        this.mostrarProductos()
    }

    async mostrarProductos(){
        const response = await Servicio.get()
        this.setState({
            productos: response.results
        })
    }

    async mostrarTiposVia(){
        const response = await Ubicacion.getTiposVia()
        this.setState({
            tipos_via: response.results
        })
    }

    async mostrarDepartamentos(){
        const response = await Ubicacion.getDepartamentos()
        this.setState({
            departamentos: response.results
        })
    }

    async handleChangeDepartamento(id_departamento){        
        const response = await Ubicacion.getProvincias(id_departamento)
        this.setState({
            provincias: response.results,
            nuevo_registro: {
                ...this.state.nuevo_registro,
                id_departamento_ubicacion: id_departamento 
            }
        })
    }

    async handleChangeProvincia(id_provincia){        
        const response = await Ubicacion.getDistrito(id_provincia)
        this.setState({
            distritos: response.results,
            nuevo_registro: {
                ...this.state.nuevo_registro,
                id_provincia_ubicacion: id_provincia
            }
        })
    }

    async handleChangeDistrito(id_distrito){
        this.setState({
            nuevo_registro: {
                ...this.state.nuevo_registro,
                id_distrito_ubicacion: id_distrito
            }
        })
    } 

    handleChangeTipoVia(id_tipo_via_ubicacion){
        this.setState({
            nuevo_registro: {
                ...this.state.nuevo_registro,
                id_tipo_via_ubicacion
            }
        })
    }

    handleChangeVía(evt){
        this.setState({
            nuevo_registro: {
                ...this.state.nuevo_registro,
                via_ubicacion: evt.target.value
            }
        })
    }

    handleChangeNumeroVia(evt){
        this.setState({
            nuevo_registro: {
                ...this.state.nuevo_registro,
                numeracion_via_ubicacion: evt.target.value
            }
        })
    }

    handleChangeDescripcion(evt){
        this.setState({
            nuevo_registro: {
                ...this.state.nuevo_registro,
                descripcion_ubicacion: evt.target.value
            }
        })
    }

    handleChangeProducto(id_producto){
        this.setState({ 
            nuevo_registro: {
                ...this.state.nuevo_registro,
                id_producto
            }
        })
    }

    handleChangeCantidad(evt){
        this.setState({
            nuevo_registro: {
                ...this.state.nuevo_registro,
                cantidad: evt.target.value
            }
        })
    }

    handleAddItem(){
        this.props.onAddItem({
            ...this.state.nuevo_registro,
            ...this.state.productos.find(elm => this.state.nuevo_registro.id_producto == elm.id_item)
        })
        // console.log(this.state.nuevo_registro);
    }

    render() {
        return (
            <div className="tab-pane">
                <div>
                    <div className="form-group mb-2">
                        <label>Departamento - Ubicación</label>
                        <SelectSearch value={this.state.nuevo_registro.id_departamento_ubicacion} options={this.state.departamentos} name="departamento" optionsValue="id_departamento" optionsDisplayValue="descripcion" placeholder="" onChange={this.handleChangeDepartamento} />
                    </div>
                    <div className="form-group mb-2">
                        <label>Provincia - Ubicación</label>
                        <SelectSearch value={this.state.nuevo_registro.id_provincia_ubicacion} options={this.state.provincias} name="provincia" optionsValue="id_provincia" optionsDisplayValue="descripcion" placeholder="" onChange={this.handleChangeProvincia} />
                    </div>                            
                    <div className="form-group mb-2">
                        <label>Distrito - Ubicación</label>
                        <SelectSearch value={this.state.nuevo_registro.id_distrito_ubicacion} options={this.state.distritos} name="distrito" optionsValue="id_distrito" optionsDisplayValue="descripcion" placeholder="" onChange={this.handleChangeDistrito} />
                    </div>
                    <div className="form-group mb-2">
                        <label>Tipo de Vía - Ubicación</label>
                        <SelectSearch value={this.state.nuevo_registro.id_tipo_via_ubicacion}  options={this.state.tipos_via} name="tipo_via" optionsValue="id_tipo_via" optionsDisplayValue="descripcion" placeholder="" onChange={this.handleChangeTipoVia} />
                    </div>
                    <div className="row">
                        <div className="col-8">
                            <div className="form-group mb-2">
                                <label>Vía</label>
                                <input className="form-control" placeholder="" onChange={this.handleChangeVía} value={this.state.nuevo_registro.via_ubicacion || ''} />
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="form-group mb-2">
                                <label>Número</label>
                                <input className="form-control" placeholder="" onChange={this.handleChangeNumeroVia} value={this.state.nuevo_registro.numeracion_via_ubicacion || ''} />
                            </div>
                        </div>                  
                    </div>
                    <div className="form-group mb-2">
                        <label>Descripción - Ubicación</label>
                        <input className="form-control" placeholder="" onChange={this.handleChangeDescripcion} value={this.state.nuevo_registro.descripcion_ubicacion || ''} />
                    </div>
                    <div className="row">
                        <div className="col-8">
                            <div className="form-group mb-2">
                                <label>Producto</label>
                                <SelectSearch value={this.state.nuevo_registro.id_producto}  options={this.state.productos} name="productos" optionsValue="id_item" optionsDisplayValue="abreviatura" placeholder="" onChange={this.handleChangeProducto} />
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="form-group mb-2">
                                <label>Cant.</label>
                                <input type="number" className="form-control" placeholder="" value={this.state.nuevo_registro.cantidad || ''} onChange={this.handleChangeCantidad}/>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-12">
                            <button className="btn btn-lg btn-primary col-12" onClick={this.handleAddItem}>AGREGAR</button>
                        </div>    
                    </div>
                </div>
                <div className="table-component mt-3">
                    <table className="table mini">
                        <thead>
                            <tr>
                                <th>Prod.</th><th>Cant.</th><th>Precio</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1P24LD</td>
                                <td>9</td>
                                <td>S/3100.00</td>
                            </tr>
                            <tr>
                                <td>1P24LD</td>
                                <td>9</td>
                                <td>S/3100.00</td>
                            </tr>
                            <tr>
                                <td>1P24LD</td>
                                <td>9</td>
                                <td>S/3100.00</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="2">DESCUENTO A APROBAR</td>
                                <td>0%</td>
                            </tr>
                        </tfoot>                  
                    </table>
                </div>                            
            </div>
        )
    }
}