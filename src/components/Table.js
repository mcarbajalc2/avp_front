import React from 'react'
import './styles/Table.css'
import {ReactComponent as ChevronLeftIcon} from '../images/ChevronLeft.svg'
import {ReactComponent as ChevronRightIcon} from '../images/ChevronRight.svg'

export default class Table extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            pages: 6
        }
    }
    render(){
        return(
            <div className='table-component mb-5'>
                <div className="table-responsive">
                    <table className="table">
                        {this.getHeader()}
                        {this.getBody()}
                    </table>                    
                </div>
                <div className="pages text-center mt-3">
                    <ul className='list-unstyled list-group list-group-horizontal d-inline-flex'>
                        {/* {this.getPages()} */}
                    </ul>
                </div>
            </div>
            
        )
    }

    getPages(){
        let list = [<li key='pg-first'><ChevronLeftIcon width='20px' height='20px'/></li>]
        for(let i = 0; i < this.state.pages; i++){
            list.push(<li key={'pg-' + (i+1)}>{i+1}</li>)
        }
        list.push(<li key='pg-last'><ChevronRightIcon width='20px' height='20px'/></li>)
        return list
    }

    getBody(){
        const rows = this.props.data.map((row, idx) => {
            const cells = this.props.cellKeys.map(col => {
                if(this.props.dataPk === 'idx'){
                    if(typeof col === 'object'){
                        return <td key={idx+col.key}>{row[col.key]}</td>
                    }else{
                        return <td key={idx+col}>{row[col]}</td>
                    }
                }else{
                    if(typeof col === 'object'){
                        return <td key={row[this.props.dataPk]+col.key}>{row[col.key]}</td>
                    }else{
                        return <td key={row[this.props.dataPk]+col}>{row[col]}</td>
                    }
                }                
            })
            if(this.props.dataPk === 'idx'){
                return <tr  key={'tr-'+idx}>{cells}</tr>
            }else{
                return <tr  key={'tr-'+row[this.props.dataPk]}>{cells}</tr>
            }            
        });

        return (
            <tbody>
                {rows}
            </tbody>
        )
    }

    getHeader(){
        const headers = this.props.headers.map((itm, idx) => {
            return <th key={'th' + idx}>{itm.content}</th>
        })
        return (
            <thead>
                <tr>
                    {headers}
                </tr>                
            </thead>
        )
    }
}