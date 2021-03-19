import React from 'react'
import './styles/TopBar.css'
import {ReactComponent as MenuBtn} from '../images/MenuBtn.svg'
import {ReactComponent as LupaIcon} from '../images/Lupa.svg'
import {ReactComponent as CampanaIcon} from '../images/Campana.svg'
import {ReactComponent as ExpandirIcon} from '../images/Expandir.svg'
import PerfilImg from '../images/Perfil.png'

export default class TopBar extends React.Component{
    render(){
        return (
            <div className='topbar-component d-flex justify-content-between'>
                <div className='d-flex'>
                    <div className='menu-btn-block left-size d-flex justify-content-center align-items-center'>
                        <button className='btn'>
                            <MenuBtn />
                        </button>
                    </div>                
                    <div className='search-block d-flex align-items-center'>
                        <div className='input-icon-container'>                        
                            <input className='form-control' type="text" placeholder='Buscar'/>                        
                            <LupaIcon className='input-icon input-icon-right' />
                        </div>                    
                    </div> 
                </div>
                <div className='d-flex align-items-center'>
                    <button className='btn btn-icon'>
                        <CampanaIcon />
                        <div className='burble'>3</div>
                    </button>
                    <button className='btn btn-icon'>
                        <ExpandirIcon />
                    </button>
                    <div className='dropdown'>
                        <button className='btn btn-profile d-flex align-items-center' data-bs-toggle="dropdown" id='btn-profile'>
                            Usuario Rojas
                            <img className='circle-o' width='40px' height='40px' src={PerfilImg} alt="Imagen de Perfil" />
                        </button>
                        <ul className='dropdown-menu' aria-labelledby='btn-profile' >
                            <li>
                                <a className="dropdown-item"  href="#test">Soporte</a>
                            </li>
                            <li>
                                <a className="dropdown-item"  href="#test">Cerrar Sesión</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}