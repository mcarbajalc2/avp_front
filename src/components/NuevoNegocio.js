import React from 'react'
import NuevaEmpresaPane from './NuevaEmpresaPane'
import ContactoPane from './ContactoPane'
import { ReactComponent as ExitoImg } from '../images/Exito.svg'
import Negocio from '../services/Negocio'

export default class NuevoNegocio extends React.Component{
    constructor(props){
        super(props)        
        this.state = {
            active: 'empresa'
        }
        this.handleSubmitNuevaEmpresa = this.handleSubmitNuevaEmpresa.bind(this)
        this.handleClickTabItem = this.handleClickTabItem.bind(this)
        this.handleSubmitContacto = this.handleSubmitContacto.bind(this)
        this.handleClickCotizar = this.handleClickCotizar.bind(this)
    }

    handleClickCotizar(evt){
        this.props.onFinish('cotizar', this.state.id_negocio)
    }

    async handleSubmitContacto(id_persona_contacto){
        if(
            (this.state.id_empresa !== undefined || this.state.id_empresa > 0)
        ){
            const response = await Negocio.add(this.state.id_empresa, id_persona_contacto)
            if(response.complete){
                this.setState({
                    id_persona_contacto,
                    active: 'final',
                    id_negocio: response.id_negocio
                })
            }     
            this.props.onSave()
        }
    }
    
    handleSubmitNuevaEmpresa(id_empresa){
        this.setState({
            id_empresa,
            active: 'contacto'
        })
    }

    handleClickTabItem(evt){
        this.setState({
            active: evt.target.getAttribute('data-toggle')
        })
    }

    render() {
        return (
            <div className='h-100-force'>
                <ul className="nav nav-tabs d-flex justify-content-between flex-nowrap" id="myTab" role="tablist">
                    <li className="nav-item">
                        <button className={"nav-link text-center " + (this.state.active === 'empresa' ? 'active' : '')} data-toggle='empresa' id="empresa-tab" type="button" onClick={this.handleClickTabItem}>
                            Paso 1<br/>
                            Empresa
                        </button>
                    </li>
                    <li className="nav-item">
                        <button className={"nav-link text-center " + (this.state.active === 'contacto' ? 'active' : '')} id="contacto-tab" data-toggle="contacto" type="button" onClick={this.handleClickTabItem}>
                            Paso 2<br/>
                            Contacto
                        </button>
                    </li>
                    <li className="nav-item">
                        <button className={"nav-link text-center " + (this.state.active === 'final' ? 'active' : '')} id="final-tab" data-toggle="final" type="button" onClick={this.handleClickTabItem}>
                            Paso 3<br/>
                            Final
                        </button>
                    </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                    <NuevaEmpresaPane active={this.state.active === 'empresa'} onSubmit={this.handleSubmitNuevaEmpresa} />
                    <ContactoPane idEmpresa={this.state.id_empresa} active={this.state.active === 'contacto'} onSubmit={this.handleSubmitContacto}/>                    
                    {/* <div className="tab-pane fade" id="contacto" role="tabpanel" aria-labelledby="contacto-tab">...</div> */}
                    <div className={"tab-pane fade d-flex flex-column justify-content-center align-items-center pt-5 " + (this.state.active === 'final' ? 'show' : '')} id="final" role="tabpanel" aria-labelledby="final-tab">
                            <ExitoImg className="mb-4"/>
                            <p className="text-center mb-4">TU NEGOCIO SE REGISTRO CORRECTAMENTE</p>
                            <button className="btn btn-primary btn-lg d-block mb-3" onClick={this.handleClickCotizar}>COTIZAR</button>
                            <button className="btn btn-outline-primary btn-lg d-block">SALIR</button>
                    </div>
                </div>
            </div>
        )
    }
}