import React from 'react'

export default class SelectSearch extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            value: '',
            id: this.props.name + Date.now(),
            estado: 0
        }
        this.input = React.createRef()
        this.handleChangeValue = this.handleChangeValue.bind(this)
        this.handleClickOption = this.handleClickOption.bind(this)
    }

    componentDidUpdate(prevProps, prevState){
        if(
            prevProps.value !== this.props.value || 
            (prevProps.options.length === 0 && this.props.options.length > 0) ||
            (this.props.options !== prevProps.options)
        ){
            const option = (this.props.options.find(elm => Number(elm[this.props.optionsValue]) === Number(this.props.value)))
            this.setState({
                value: option ? option[this.props.optionsDisplayValue] : ''
            }, () => {
                if(option){
                    this.props.onChange(option[this.props.optionsValue])
                }                
            })
        }
    }

    handleChangeValue(evt){
        this.setState({
            value: evt.target.value
        })
    }

    handleClickOption(evt){
        const value = evt.target.getAttribute("data-value")
        this.setState({
            value: evt.target.innerHTML
        }, () => {
            this.props.onChange(value)
        })
    }

    getValue(){
        const selectOption = this.props.options.find(elm => elm[this.props.optionsValue] === this.props.value)
        return selectOption ? selectOption[this.props.optionsDisplayValue] : ''
    }

    getOptions(){        
        const options = this.props.options.map(elm => {
            const A = elm[this.props.optionsDisplayValue].toUpperCase().trim()
            const B = this.state.value ? this.state.value.toUpperCase().trim() : ''
            if(A.includes(B)){
                return <li className='dropdown-item' data-value={elm[this.props.optionsValue]} key={`dropdown-${this.state.ud}-opt-${elm[this.props.optionsValue]}`} onClick={this.handleClickOption}>
                    {elm[this.props.optionsDisplayValue]}
                </li>
            }else{
                return undefined
            }         
        })
        return options
    }

    render() {
        const options = this.getOptions()        
        return (
            <div className="SelectSearchComponent dropdown">
                <input className="form-control" type="text" value={this.state.value} onChange={this.handleChangeValue} id={"dropdown-"+this.state.id} data-bs-toggle="dropdown" placeholder={this.props.placeholder} autoComplete="Desactivado"/>
                <ul className="dropdown-menu" style={{
                    maxHeight: "210px",
                    overflow: "auto"
                }}>
                    {options}
                </ul>
            </div>
        )
    }
}