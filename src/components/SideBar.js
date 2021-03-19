import React from 'react'
import './styles/SideBar.css'
import {ReactComponent as CerrarIcon} from '../images/Cerrar.svg'

export default class SideBar extends React.Component{
    
    render(){
        return (
            <aside>
                <div className="aside-container">
                    <button className='btn'>
                        <CerrarIcon/>
                    </button>
                    <div className="aside-title-block">
                        <h4 className='fw-normal'>{this.props.title}</h4>
                    </div>
                    <div className="aside-content-block">
                        {this.props.children}
                    </div>
                </div>                
            </aside>
        )
    }
}