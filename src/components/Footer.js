import React from 'react'
import './styles/Footer.css'

export default class Footer extends React.Component{
    render(){
        return (
            <footer className="page-footer" style={{opacity: 1}}>
                <div className="footer-content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12 col-sm-6">
                                <p className="mb-0 text-muted">AVP y Seguridad 2021</p>
                            </div>
                            <div className="col-sm-6 d-none d-sm-block">
                                <ul className="breadcrumb pt-0 pr-0 float-end">
                                    <li className="breadcrumb-item mb-0">
                                        <a href="#" className="btn-link">Review</a>
                                    </li>
                                    <li className="breadcrumb-item mb-0">
                                        <a href="#" className="btn-link">Purchase</a>
                                    </li>
                                    <li className="breadcrumb-item mb-0">
                                        <a href="#" className="btn-link">Docs</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}