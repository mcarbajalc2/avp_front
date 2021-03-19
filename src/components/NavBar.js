import React from 'react'
import './styles/NavBar.css'
import {ReactComponent as CarritoIcon} from '../images/Carrito.svg'
import {ReactComponent as PortapapelesIcon} from '../images/Portapapeles.svg'

export default class Navbar extends React.Component{
    render(){
        return (
            <nav>
                <div className='menu-lv-2'>
                    <ul className='list-unstyled'>
                        <li className='d-flex align-items-center'>
                            <PortapapelesIcon/>
                            Negocios
                        </li>
                    </ul>    
                </div>  
                <div className='menu-lv-1 left-size'>
                    <ul className='list-unstyled'>
                        <li className='active d-flex align-items-center justify-content-center flex-column'>
                            <div className="li-icon">
                                <CarritoIcon/>
                            </div>
                            <div className="li-title">
                                CRM
                            </div>
                        </li>
                    </ul>
                </div>                          
            </nav>
        )
    }
}