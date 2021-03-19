import React from 'react'
import ReactDOM from 'react-dom'

const myRef = React.createRef()

class Notification extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            show: true
        }
        this.handleClickCerrar = this.handleClickCerrar.bind(this)
        this.startTimer()
    }

    startTimer(){
        setTimeout(() => {
            this.setState({
                show: false
            })
        }, 5000)
    }

    handleClickCerrar(){
        this.setState({
            show: false
        })
    }

    render(){
        return (
            <div className={"toast fade align-items-center text-white border-0 " + (this.state.show ? 'show' : 'hide') + ' ' + this.props.color} role="alert" aria-live="assertive" aria-atomic="true">
                <div className="d-flex">
                    <div className="toast-body">
                        {this.props.text}
                    </div>
                    <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" onClick={this.handleClickCerrar}></button>
                </div>
            </div>
        )
    }
}

class Notifications extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            notifications: [],
            i: 0
        }
    }

    add(text, color) {
        return new Promise((resolve, reject) => {
            this.setState({
                notifications: [
                    ...this.state.notifications,
                    <Notification color={color} text={text} key={`toastr-${this.state.i + 1}`} />
                ],
                i: this.state.i + 1
            }, () => {
                resolve()
            })
        })        
    }

    render() {
        return (
            <div className="toast-container position-absolute p-3 end-0">
                {this.state.notifications}
            </div>
        )
    }
}

export async function addNotification(text, color) {    
    return await myRef.current.add(text, color)
}

ReactDOM.render(<Notifications ref={myRef} />, document.getElementById('notifications'))