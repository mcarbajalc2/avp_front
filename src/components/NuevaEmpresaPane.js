import React from 'react'
import SelectSearch from './SelectSearch'
import Empresa from '../services/Empresa'
import Ubicacion from '../services/Ubicacion'
import Misc from '../helpers/Misc'
import { addNotification } from './Notifications'

export default class NuevaEmpresaPane extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            empresa: {
                id_departamento_direccion_fiscal: 15,
                id_provincia_direccion_fiscal: 128
            },
            departamentos: [],
            provincias: [],
            distritos: [],
            tipos_via: [],
            actividades_comerciales: [],
            active: true
        }
        this.handleChangeRUC = this.handleChangeRUC.bind(this)
        this.handleChangeRazonSocial = this.handleChangeRazonSocial.bind(this)
        this.handleChangeIdEmpresaTipo = this.handleChangeIdEmpresaTipo.bind(this)
        this.handleChangeCondicionDomicilio = this.handleChangeCondicionDomicilio.bind(this)
        this.handleChangeFechaInscripcion = this.handleChangeFechaInscripcion.bind(this)
        this.handleChangeDepartamento = this.handleChangeDepartamento.bind(this)
        this.handleChangeProvincia = this.handleChangeProvincia.bind(this)
        this.handleChangeDistrito = this.handleChangeDistrito.bind(this)
        this.handleChangeTipoVia = this.handleChangeTipoVia.bind(this)
        this.handleChangeVia = this.handleChangeVia.bind(this)
        this.handleChangeNumeracionVia = this.handleChangeNumeracionVia.bind(this)
        this.handleChangeActividadComercial = this.handleChangeActividadComercial.bind(this)
        this.handleClickSiguiente = this.handleClickSiguiente.bind(this)
        this.handleChangeDireccionFiscal = this.handleChangeDireccionFiscal.bind(this)
        this.mostrarDepartamentos()
        this.mostrarTiposDeEmpresa()
        this.mostrarCondicionDomicilio()
        this.mostrarTiposVia()
        this.mostrarActividadesComerciales()
    }

    async handleClickSiguiente(){       
        if(await this.validarCampos()){
            if(this.state.empresa.id_empresa){
                this.next(this.state.empresa.id_empresa)
            }else{
                this.agregarEmpresa()
            }
        }
    }

    async agregarEmpresa(){
        const response = await Empresa.add({
            ...this.state.empresa,
            numeracion_via_direccion_fiscal: Misc.isEmpty(this.state.empresa.numeracion_via_direccion_fiscal) ? undefined : this.state.empresa.numeracion_via_direccion_fiscal
        });
        if(response.complete){
            this.next(response.id_empresa)
            this.setState({
                empresa: {
                    ...this.state.empresa,
                    id_empresa: response.id_empresa
                }
            })
        }
    }

    next(id_empresa){
        this.props.onSubmit(id_empresa)
        if(this.state.active === false){
            this.forceUpdate()
        }else{
            this.setState({ 
                active: false
            })
        }      
    }

    async validarCampos(){
        let result = true
        if(Misc.isEmpty(this.state.empresa.RUC) || !Misc.isRUC(this.state.empresa.RUC)){
            result = false
            await addNotification('El campo RUC esta vacio o tiene un formato no válido.', 'bg-warning')
        }
        if(Misc.isEmpty(this.state.empresa.razon_social)){
            result = false
            await addNotification('El campo Razón Social esta vacio.', 'bg-warning')
        }
        if(Misc.isEmpty(this.state.empresa.id_empresa_tipo)){
            result = false
            await addNotification('Seleccione un Tipo de Empresa', 'bg-warning')
        }
        if(Misc.isEmpty(this.state.empresa.id_domicilio_fiscal_condicion)){
            result = false
            await addNotification('Seleccione una Condición', 'bg-warning')
        }
        if(Misc.isEmpty(this.state.empresa.fecha_inscripcion)){
            result = false
            await addNotification('Seleccione una Fecha de Inscripción', 'bg-warning')
        }
        if(Misc.isEmpty(this.state.empresa.id_distrito_direccion_fiscal)){
            result = false
            await addNotification('Seleccione un Distrito', 'bg-warning')
        }
        if(Misc.isEmpty(this.state.empresa.id_tipo_via_direccion_fiscal)){
            result = false
            await addNotification('El campo Tipo de Vía esta vacio', 'bg-warning')
        }
        if(Misc.isEmpty(this.state.empresa.via_direccion_fiscal)){
            result = false
            await addNotification('El campo Vía esta vacio', 'bg-warning')
        }
        if(Misc.isEmpty(this.state.empresa.direccion_fiscal)){
            result = false
            await addNotification('El campo Dirección Fiscal esta vacio', 'bg-warning')
        }
        if(Misc.isEmpty(this.state.empresa.id_actividad_comercial)){
            result = false
            await addNotification('Seleccione una Actividad comercial', 'bg-warning')
        }
        return result
    }

    handleChangeNumeracionVia(evt){
        this.setState({ 
            empresa: {
                ...this.state.empresa,
                numeracion_via_direccion_fiscal: evt.target.value
            }
        })
    }

    handleChangeVia(evt){
        this.setState({
            empresa: {
                ...this.state.empresa,
                via_direccion_fiscal: evt.target.value
            }
        })
    }

    handleChangeRazonSocial(evt){
        this.setState({
            empresa: {
                ...this.state.empresa,
                razon_social: evt.target.value
            }
        })
    }

    handleChangeRUC(evt){
        this.setState({
            empresa: {
                ...this.state.empresa,
                RUC: evt.target.value
            }
        }, () => {
            if(Misc.isRUC(this.state.empresa.RUC)){
                this.buscarEmpresa()
            }    
        })        
    }

    handleChangeIdEmpresaTipo(evt){
        this.setState({
            empresa: {
                ...this.state.empresa,
                id_empresa_tipo: evt.target.value
            }
        })   
    }

    handleChangeCondicionDomicilio(evt){
        this.setState({
            empresa: {
                ...this.state.empresa,
                id_domicilio_fiscal_condicion: evt.target.value
            }
        })
    }

    handleChangeFechaInscripcion(evt){
        this.setState({
            empresa: {
                ...this.state.empresa,
                fecha_inscripcion: evt.target.value
            }
        })
    }

    handleChangeTipoVia(id_tipo_via_direccion_fiscal){
        this.setState({
            empresa: {
                ...this.state.empresa,
                id_tipo_via_direccion_fiscal
            }
        })
    }

    handleChangeDireccionFiscal(evt){
        this.setState({
            empresa: {
                ...this.state.empresa,
                direccion_fiscal: evt.target.value
            }
        })
    }

    handleChangeActividadComercial(id_actividad_comercial){
        this.setState({
            empresa: {
                ...this.state.empresa,
                id_actividad_comercial: id_actividad_comercial
            }
        })
    }

    async handleChangeDepartamento(id_departamento){        
        const response = await Ubicacion.getProvincias(id_departamento)
        this.setState({
            provincias: response.results,
            empresa: {
                ...this.state.empresa,
                id_departamento_direccion_fiscal: id_departamento 
            }
        })
    }

    async handleChangeProvincia(id_provincia){        
        const response = await Ubicacion.getDistrito(id_provincia)
        this.setState({
            distritos: response.results,
            empresa: {
                ...this.state.empresa
            }
        })
    }

    async handleChangeDistrito(id_distrito){
        this.setState({
            empresa: {
                ...this.state.empresa,
                id_distrito_direccion_fiscal: id_distrito
            }
        })
    }

    async mostrarTiposVia(){
        const response = await Ubicacion.getTiposVia()
        this.setState({
            tipos_via: response.results
        })
    }


    async mostrarTiposDeEmpresa(){
        const response = await Empresa.getTipos()
        const options = [
            <option key={`tipo-empresa-0`} value=''></option>,
            ...response.results.map(elm => {
                return <option key={`tipo-empresa-${elm.id_empresa_tipo}`} value={elm.id_empresa_tipo}>{elm.abreviatura}</option>
            })
        ]
        this.setState({
            tipo_empresa_options: options,
        })
    }

    async mostrarCondicionDomicilio(){
        const response = await Empresa.getCondicionDomicilio()
        const options = [
            <option key={`condicion-domicilio-0`} value=''></option>,
            ...response.results.map(elm => {
                return <option key={`condicion-domicilio-${elm.id_domicilio_fiscal_condicion}`} value={elm.id_domicilio_fiscal_condicion}>{elm.descripcion}</option>
            })
        ]
        this.setState({
            condicion_domicilio_options: options
        })
    }

    async mostrarActividadesComerciales(){
        const response = await Empresa.getActividadComercial()
        this.setState({
            actividades_comerciales: response.results
        })
    }

    async buscarEmpresa(){
        const response = await Empresa.buscar(this.state.empresa.RUC)
        if(response.complete && response.results.length > 0){
            this.setState({
                empresa: {
                    ...this.state.empresa,
                    razon_social: response.results[0].razon_social,
                    id_empresa: response.results[0].id_persona,
                    id_empresa_tipo: response.results[0].id_empresa_tipo,
                    id_domicilio_fiscal_condicion: response.results[0].id_domicilio_fiscal_condicion,
                    fecha_inscripcion: response.results[0].fecha_inscripcion,
                    id_departamento_direccion_fiscal: response.results[0].id_departamento_direccion_fiscal,
                    id_provincia_direccion_fiscal: response.results[0].id_provincia_direccion_fiscal,
                    id_distrito_direccion_fiscal: response.results[0].id_distrito_direccion_fiscal,
                    id_tipo_via_direccion_fiscal: response.results[0].id_tipo_via_direccion_fiscal,
                    via_direccion_fiscal: response.results[0].via_direccion_fiscal,
                    numeracion_via_direccion_fiscal: response.results[0].numeracion_via_direccion_fiscal,
                    direccion_fiscal: response.results[0].direccion_fiscal,
                    id_actividad_comercial: response.results[0].id_actividad_comercial
                }
            })
        }
    }

    async mostrarDepartamentos(){
        const response = await Ubicacion.getDepartamentos()
        this.setState({
            departamentos: response.results
        })
    }
    
    componentDidUpdate(prevProps, PrevState){
        if(prevProps.active !== this.props.active){
            this.setState({
                active: this.props.active
            })
        }
    }

    render() {
        return (
            <div className={"tab-pane fade h-100-force " + (this.state.active ? 'show active' : '')} id="empresa" role="tabpanel" aria-labelledby="empresa-tab">
                <div className="content-frame">
                    <div className="form-group mb-2">
                        <label>RUC</label>
                        <input className="form-control datepicker" placeholder="" onChange={this.handleChangeRUC} value={this.state.empresa.RUC || ''} />
                    </div>
                    <div className="form-group mb-2">
                        <label>Razón Social</label>
                        <input className="form-control datepicker" placeholder="" value={this.state.empresa.razon_social || ''} onChange={this.handleChangeRazonSocial} />
                    </div>
                    <div className="form-group mb-2">
                        <label>Tipo de Empresa</label>
                        <select className="form-select" value={this.state.empresa.id_empresa_tipo} onChange={this.handleChangeIdEmpresaTipo}>
                            {this.state.tipo_empresa_options}
                        </select>
                    </div>
                    <div className="form-group mb-2">
                        <label>Condición</label>
                        <select className="form-select" value={this.state.empresa.id_domicilio_fiscal_condicion} onChange={this.handleChangeCondicionDomicilio}>
                            {this.state.condicion_domicilio_options}
                        </select>
                    </div>
                    <div className="form-group mb-2">
                        <label>Fecha de Inscripción</label>
                        <input type="date" className="form-control datepicker" placeholder="dd-mm-aaaa" max={Misc.getDate()} value={this.state.empresa.fecha_inscripcion || ''} onChange={this.handleChangeFechaInscripcion} />
                    </div>
                    <div className="form-group mb-2">
                        <label>Departamento - Dirección Fiscal</label>
                        <SelectSearch value={this.state.empresa.id_departamento_direccion_fiscal} options={this.state.departamentos} name="departamento" optionsValue="id_departamento" optionsDisplayValue="descripcion" placeholder="" onChange={this.handleChangeDepartamento} />
                    </div>
                    <div className="form-group mb-2">
                        <label>Provincia - Dirección Fiscal</label>
                        <SelectSearch value={this.state.empresa.id_provincia_direccion_fiscal} options={this.state.provincias} name="provincia" optionsValue="id_provincia" optionsDisplayValue="descripcion" placeholder="" onChange={this.handleChangeProvincia} />
                    </div>                            
                    <div className="form-group mb-2">
                        <label>Distrito - Dirección Fiscal</label>
                        <SelectSearch value={this.state.empresa.id_distrito_direccion_fiscal} options={this.state.distritos} name="distrito" optionsValue="id_distrito" optionsDisplayValue="descripcion" placeholder="" onChange={this.handleChangeDistrito} />
                    </div>
                    <div className="form-group mb-2">
                        <label>Tipo de Vía - Dirección Fiscal</label>
                        <SelectSearch value={this.state.empresa.id_tipo_via_direccion_fiscal}  options={this.state.tipos_via} name="tipo_via" optionsValue="id_tipo_via" optionsDisplayValue="descripcion" placeholder="" onChange={this.handleChangeTipoVia} />
                    </div>
                    <div className="form-group mb-2">
                        <label>Vía - Dirección Fiscal</label>
                        <input className="form-control" type="text" value={this.state.empresa.via_direccion_fiscal || ''} onChange={this.handleChangeVia}/>
                    </div>
                    <div className="form-group mb-2">
                        <label>Numeración de Vía - Dirección Fiscal</label>
                        <input className="form-control" type="text" value={this.state.empresa.numeracion_via_direccion_fiscal || ''} onChange={this.handleChangeNumeracionVia}/>
                    </div>
                    <div className="form-group mb-2">
                        <label>Dirección Fiscal</label>
                        <input type="text" value={this.state.empresa.direccion_fiscal || ''} onChange={this.handleChangeDireccionFiscal} className="form-control datepicker" />
                    </div>
                    <div className="form-group mb-2">
                        <label>Actividad Comercial</label>
                        <SelectSearch value={this.state.empresa.id_actividad_comercial} options={this.state.actividades_comerciales} name='actividad_comercial' optionsValue='id_actividad_comercial' optionsDisplayValue='descripcion' placeholder="" onChange={this.handleChangeActividadComercial}  />
                    </div>
                </div>
                <div className="content-buttons d-flex align-items-center">
                    <button className="btn btn-primary btn-lg" onClick={this.handleClickSiguiente} >SIGUIENTE</button>
                </div>
            </div>
        )
    }
}