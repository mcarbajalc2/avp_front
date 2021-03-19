import React from 'react'
import SelectSearch from './SelectSearch'
import {ReactComponent as OptionsImg} from '../images/Options.svg'
import {ReactComponent as AtrasImg} from '../images/Atras.svg'
import Persona from '../services/Persona'
import Ubicacion from '../services/Ubicacion'
import { addNotification } from './Notifications'
import Empresa from '../services/Empresa'

export default class ContactoPane extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            active: false,
            modo: 1,//1 = lista, 2 = nuevo contacto
            contactos: [],
            tipos_documento_identidad: [],
            nuevo_contacto: { },
            departamentos: [],
            provincias: [],
            distritos: [],
            tipos_via: [],
            relaciones: []
        }
        
        this.handleClickNuevoContacto = this.handleClickNuevoContacto.bind(this)
        this.handleClickAtras = this.handleClickAtras.bind(this)
        this.handleChangeDocumento = this.handleChangeDocumento.bind(this)
        this.handleChangeTipoDocumentoIdentidad = this.handleChangeTipoDocumentoIdentidad.bind(this)
        this.handleChangeNombres = this.handleChangeNombres.bind(this)
        this.handleChangeApPaterno = this.handleChangeApPaterno.bind(this)
        this.handleChangeApMaterno = this.handleChangeApMaterno.bind(this)
        this.handleChangeTelefono = this.handleChangeTelefono.bind(this)
        this.handleChangeEmail = this.handleChangeEmail.bind(this)
        this.handleChangeFechaNacimiento = this.handleChangeFechaNacimiento.bind(this)
        this.handleChangeDepartamento = this.handleChangeDepartamento.bind(this)
        this.handleChangeProvincia = this.handleChangeProvincia.bind(this)
        this.handleChangeDistrito = this.handleChangeDistrito.bind(this)
        this.handleChangeNumeracionVia = this.handleChangeNumeracionVia.bind(this)
        this.handleChangeVia = this.handleChangeVia.bind(this)
        this.handleChangeTipoVia = this.handleChangeTipoVia.bind(this)
        this.handleChangeDireccionDomicilio = this.handleChangeDireccionDomicilio.bind(this)
        this.handleChangeRelacion = this.handleChangeRelacion.bind(this)
        this.handleClickGuardar = this.handleClickGuardar.bind(this)
        this.handleClickContacto = this.handleClickContacto.bind(this)
        this.handleClickSiguiente = this.handleClickSiguiente.bind(this)

        this.mostrarTiposDocumentoIdentidad()
        this.mostrarDepartamentos()
        this.mostrarTiposVia()
        this.mostrarRelaciones()
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.active !== this.props.active){
            this.setState({
                active: this.props.active,
            })
        }
        if(prevProps.idEmpresa !== this.props.idEmpresa){
            this.mostrarContactos()
            this.setState({                
                nuevo_contacto: {
                    ...this.state.nuevo_contacto,
                    id_empresa: this.props.idEmpresa
                }
            })
        }
    }

    async mostrarContactos(){
        const response = await Persona.getContactos(this.props.idEmpresa)
        this.setState({
            modo: 1,
            contactos: response.results
        })
    }

    async mostrarRelaciones(){
        const response = await Persona.getPersonaRelacion()
        this.setState({
            relaciones: response.results            
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

    async mostrarTiposDocumentoIdentidad(){
        const response = await Persona.getTipoDocumentoIdentidad()
        this.setState({
            tipos_documento_identidad: response.results
        })
    }  

    async handleClickGuardar(){
        if(!isNaN(this.props.idEmpresa) && this.props.idEmpresa > 0){
            if(this.validar()){
                // Persona.
                await Empresa.addContacto({
                    ...this.state.nuevo_contacto,
                    id_empresa: this.props.idEmpresa
                })
                this.mostrarContactos()
            }
        }else{
            addNotification('Debe ingresar o seleccionar una empresa', 'bg-warning')
        }        
    }

    validar(){
        return true
    }

    handleClickSiguiente(evt){
        if(this.state.selected_contact_id !== undefined && this.state.selected_contact_id > 0){
            this.props.onSubmit(this.state.selected_contact_id)
            this.setState({
                active: false
            })  
        }        
    }

    
    handleClickContacto(evt){
        const id_persona_contacto = evt.currentTarget .getAttribute('data-id')
        this.setState({
            selected_contact_id: id_persona_contacto
        })        
    }

    async handleChangeDepartamento(id_departamento){        
        const response = await Ubicacion.getProvincias(id_departamento)
        this.setState({
            provincias: response.results,
            nuevo_contacto: {
                ...this.state.nuevo_contacto,
                id_departamento_domicilio: id_departamento 
            }
        })
    }

    async handleChangeProvincia(id_provincia){        
        const response = await Ubicacion.getDistrito(id_provincia)
        this.setState({
            distritos: response.results,
            nuevo_contacto: {
                ...this.state.nuevo_contacto,
                id_provincia_domicilio: id_provincia
            }
        })
    }

    async handleChangeDistrito(id_distrito){
        this.setState({
            nuevo_contacto: {
                ...this.state.nuevo_contacto,
                id_distrito_domicilio: id_distrito
            }
        })
    }  

    handleChangeRelacion(id_persona_relacion){
        this.setState({
            nuevo_contacto: {
                ...this.state.nuevo_contacto,
                id_persona_relacion
            }
        })
    }
    
    handleChangeDireccionDomicilio(evt){
        this.setState({
            nuevo_contacto: {
                ...this.state.nuevo_contacto,
                direccion_domicilio: evt.target.value
            }
        })
    }

    handleChangeNumeracionVia(evt){
        this.setState({ 
            nuevo_contacto: {
                ...this.state.nuevo_contacto,
                numeracion_via_domicilio: evt.target.value
            }
        })
    }
    
    handleChangeVia(evt){
        this.setState({
            nuevo_contacto: {
                ...this.state.nuevo_contacto,
                via_domicilio: evt.target.value
            }
        })
    }

    handleChangeTipoVia(id_tipo_via_domicilio){
        this.setState({
            nuevo_contacto: {
                ...this.state.nuevo_contacto,
                id_tipo_via_domicilio
            }
        })
    }

    handleChangeFechaNacimiento(evt){
        this.setState({
            nuevo_contacto: {
                ...this.state.nuevo_contacto,
                fecha_nacimiento: evt.target.value
            }
        })
    }

    handleChangeEmail(evt){
        this.setState({
            nuevo_contacto: {
                ...this.state.nuevo_contacto,
                email: evt.target.value
            }
        })
    }

    handleChangeTelefono(evt){
        this.setState({
            nuevo_contacto: {
                ...this.state.nuevo_contacto,
                telefono: evt.target.value
            }
        })
    }

    handleChangeApMaterno(evt){
        this.setState({
            nuevo_contacto: {
                ...this.state.nuevo_contacto,
                ap_materno: evt.target.value
            }
        })
    }
    
    handleChangeApPaterno(evt){
        this.setState({
            nuevo_contacto: {
                ...this.state.nuevo_contacto,
                ap_paterno: evt.target.value
            }
        })
    }

    handleChangeNombres(evt){
        this.setState({
            nuevo_contacto: {
                ...this.state.nuevo_contacto,
                nombres: evt.target.value
            }
        })
    }

    handleChangeDocumento(evt){
        this.setState({
            nuevo_contacto: {
                ...this.state.nuevo_contacto,
                documento: evt.target.value
            }
        })
    }

    handleChangeTipoDocumentoIdentidad(id_tipo_documento_identidad){
        this.setState({
            nuevo_contacto: {
                ...this.state.nuevo_contacto,
                id_tipo_documento_identidad
            }
        })
    }

    handleClickNuevoContacto(evt){
        this.setState({
            modo: 2
        })
    }

    handleClickAtras(evt){
        this.setState({
            modo: 1
        })
    }

    getNuevoContacto(){
        return (
            <div className={"tab-pane fade h-100-force " + (this.state.active ? 'show active' : '')} id="empresa" role="tabpanel" aria-labelledby="empresa-tab">
                <div className="content-frame">
                    <div className="form-group mb-2">
                        <label>Relación</label>
                        <SelectSearch value={this.state.nuevo_contacto.id_persona_relacion} options={this.state.relaciones} name="relaciones" optionsValue="id_persona_relacion" optionsDisplayValue="descripcion" placeholder="" onChange={this.handleChangeRelacion} />
                    </div>
                    <div className="form-group mb-2">
                        <label>Tipo de documento</label>
                        <SelectSearch value={this.state.nuevo_contacto.id_tipo_documento_identidad} options={this.state.tipos_documento_identidad} name="tipo_documento_identidad" optionsValue="id_tipo_documento_identidad" optionsDisplayValue="abreviatura" placeholder="" onChange={this.handleChangeTipoDocumentoIdentidad} />
                    </div>
                    <div className="form-group mb-2">
                        <label>Número de documento</label>
                        <input className="form-control" placeholder="" onChange={this.handleChangeDocumento} value={this.state.nuevo_contacto.documento || ''} />
                    </div>
                    <div className="form-group mb-2">
                        <label>Nombres</label>
                        <input className="form-control" placeholder="" onChange={this.handleChangeNombres} value={this.state.nuevo_contacto.nombres || ''} />
                    </div>
                    <div className="form-group mb-2">
                        <label>Apellido paterno</label>
                        <input className="form-control" placeholder="" onChange={this.handleChangeApPaterno} value={this.state.nuevo_contacto.ap_paterno || ''} />
                    </div>
                    <div className="form-group mb-2">
                        <label>Apellido materno</label>
                        <input className="form-control" placeholder="" onChange={this.handleChangeApMaterno} value={this.state.nuevo_contacto.ap_materno || ''} />
                    </div>
                    <div className="form-group mb-2">
                        <label>Número de Teléfono</label>
                        <input className="form-control" placeholder="" onChange={this.handleChangeTelefono} value={this.state.nuevo_contacto.telefono || ''} />
                    </div>
                    <div className="form-group mb-2">
                        <label>Correo Electrónico</label>
                        <input className="form-control" placeholder="" onChange={this.handleChangeEmail} value={this.state.nuevo_contacto.email || ''} />
                    </div>
                    <div className="form-group mb-2">
                        <label>Fecha de nacimiento</label>
                        <input type="date" className="form-control" placeholder="" onChange={this.handleChangeFechaNacimiento} value={this.state.nuevo_contacto.fecha_nacimiento || ''} />
                    </div>
                    <div className="form-group mb-2">
                        <label>Departamento - Domicilio</label>
                        <SelectSearch value={this.state.nuevo_contacto.id_departamento_domicilio} options={this.state.departamentos} name="departamento" optionsValue="id_departamento" optionsDisplayValue="descripcion" placeholder="" onChange={this.handleChangeDepartamento} />
                    </div>
                    <div className="form-group mb-2">
                        <label>Provincia - Domicilio</label>
                        <SelectSearch value={this.state.nuevo_contacto.id_provincia_domicilio} options={this.state.provincias} name="provincia" optionsValue="id_provincia" optionsDisplayValue="descripcion" placeholder="" onChange={this.handleChangeProvincia} />
                    </div>                            
                    <div className="form-group mb-2">
                        <label>Distrito - Domicilio</label>
                        <SelectSearch value={this.state.nuevo_contacto.id_distrito_domicilio} options={this.state.distritos} name="distrito" optionsValue="id_distrito" optionsDisplayValue="descripcion" placeholder="" onChange={this.handleChangeDistrito} />
                    </div>
                    <div className="form-group mb-2">
                        <label>Tipo de Vía - Domicilio</label>
                        <SelectSearch value={this.state.nuevo_contacto.id_tipo_via_domicilio}  options={this.state.tipos_via} name="tipo_via" optionsValue="id_tipo_via" optionsDisplayValue="descripcion" placeholder="" onChange={this.handleChangeTipoVia} />
                    </div>
                    <div className="form-group mb-2">
                        <label>Vía - Domicilio</label>
                        <input className="form-control" type="text" value={this.state.nuevo_contacto.via_domicilio || ''} onChange={this.handleChangeVia}/>
                    </div>
                    <div className="form-group mb-2">
                        <label>Numeración de Vía - Domicilio</label>
                        <input className="form-control" type="text" value={this.state.nuevo_contacto.numeracion_via_domicilio || ''} onChange={this.handleChangeNumeracionVia}/>
                    </div>
                    <div className="form-group mb-2">
                        <label>Dirección Domicilio</label>
                        <input type="text" value={this.state.nuevo_contacto.direccion_domicilio || ''} onChange={this.handleChangeDireccionDomicilio} className="form-control datepicker" />
                    </div>
                </div>
                <div className="content-buttons d-flex align-items-center">
                    <button className="btn btn-outline-primary btn-lg ps-3 me-2 pe-3 text-center" onClick={this.handleClickAtras}><AtrasImg className="mb-1"/></button>
                    <button className="btn btn-primary btn-lg" onClick={this.handleClickGuardar} >GUARDAR</button>
                </div>
            </div>
        )
    }

    getLista(){
        const contactos = this.state.contactos.map(elm => {
            return (
                <div className={"card p-2 rounded-0 mb-2" + (this.state.selected_contact_id === String(elm.id_persona_contacto) ? ' active' : '')}  data-id={elm.id_persona_contacto} key={`contacto-${elm.id_persona_contacto}`} role='button' onClick={this.handleClickContacto}>                    
                    <div className="d-flex justify-content-between align-items-start mb-2">                        
                        <h6 className='text-nowrap mt-1 mb-0' title="Manuel Alejandro Carbajal Cáceres">                            
                            {elm.nombre}
                        </h6>
                        <button className="btn btn-sm p-0 lh-1">
                            {/* <OptionsImg/> */}
                        </button>
                    </div>
                    <div>
                        <p className="datos rounded-0 mb-0">
                            Relación: {elm.relacion} <br/>
                            {elm.email} <br/>
                            {elm.telefono}
                        </p>
                    </div>
                </div>
            )
        });

        return (
            <div className={"tab-pane fade h-100-force " + (this.state.active ? 'show active' : '')} id="empresa" role="tabpanel" aria-labelledby="empresa-tab">
                <div className="content-frame">
                    <div className="form-group pt-3">
                        {contactos}
                        <div className="card card-add bg-light rounded-0 position-relative enable-button-pointers" role="button" onClick={this.handleClickNuevoContacto}>
                            <br/>
                            <br/>
                            <br/>
                        </div>
                    </div>
                </div>
                <div className="content-buttons d-flex align-items-center">                    
                    <button className="btn btn-primary btn-lg" onClick={this.handleClickSiguiente} >SIGUIENTE</button>
                </div>
            </div>
        )
    }

    render() {
        let content = this.state.modo === 1 ? this.getLista() : this.getNuevoContacto()
        return content
    }
}