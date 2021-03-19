import React from 'react'
import './styles/Content.css'
import {ReactComponent as ListIcon} from '../images/List.svg'
import {ReactComponent as CardsIcon} from '../images/Cards.svg'
import {ReactComponent as LupaIcon} from '../images/Lupa.svg'

export default class Content extends React.Component{
    render(){
        const button = this.getButton()
        return (
            <main>
                <div className="header-block">
                    <div className="d-flex justify-content-between align-items-baseline mb-3">
                        <div className="title d-flex align-items-baseline">
                            <h3>{this.props.title}</h3>
                            <h6 className='ms-3 small fw-normal'>{this.props.subTitle}</h6>
                        </div>
                        {button}
                    </div>
                    { this.getOptions() }                    
                </div>
                <div className="body-block">
                    {this.props.children}
                </div>                
            </main>
        )
    }

    getOptions(){
        if(this.props.buttonText){
            return (
                <div className="d-flex justify-content-between align-items-baseline">
                    <div className='d-flex align-items-center'>
                        <div className='display-disposition'>
                            <button className="btn btn-sm"><ListIcon/></button>
                            <button className="btn btn-sm"><CardsIcon/></button>
                        </div>                            
                        <div className="ms-3 display-options">
                            <div className="btn-group btn-group-sm float-md-left me-1">
                                <button className="btn btn-outline-dark btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Activo</button>
                                <ul className="dropdown-menu" x-placement="bottom-start">
                                    <li className="dropdown-item">Activo</li> 
                                    <li className="dropdown-item">Cancelado</li>
                                    <li className="dropdown-item">Cotización</li>
                                    <li className="dropdown-item">Firma</li>
                                    <li className="dropdown-item">Cerrado</li>
                                </ul>
                            </div>
                            <div className="input-icon-container search-sm calendar-sm d-inline-block float-md-left mr-1 align-top">
                                <input className='form-control form-control-sm' type="text" placeholder='Buscar'/>                        
                                <LupaIcon className='input-icon input-icon-right' />
                            </div>
                        </div>           
                    </div>                         
                    <div>
                        <small className='small'>20 cotizaciones encontradas</small>
                    </div>                       
                </div>
            )
        }else{
            return ''
        }        
    }

    getButton(){
        if(this.props.buttonText){
            return <button className='btn btn-primary btn-lg'>{this.props.buttonText}</button>
        }else{
            return <div></div>;
        }
    }
}