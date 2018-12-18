import React from 'react'
import API from '../helpers/API'
import config from '../configs/api.config.json'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            formdata: {
                username: '',
                password: ''
            },
            isRequest: false
        }
        this.onSignIn = this.onSignIn.bind(this)
        this.textChanged = this.textChanged.bind(this)
    }
    textChanged(e) {
        let tmp = this.state.formdata
        tmp[e.target.name] = e.target.value
        this.setState({
            formdata: tmp
        })
    }
    async onSignIn() {
        this.setState({
            isRequest: true
        })
        
        let result = await API.login(this.state.formdata.username, this.state.formdata.password)
        console.log(result);
        if (result.code === 200) {
            localStorage.setItem(config.LS.USERDATA, JSON.stringify(result.message.userdata))
            localStorage.setItem(config.LS.TOKEN, result.message.token)
            this.props.history.push('/product')
        } else {
            alert(result.message)
        }

        this.setState({
            isRequest: false
        })
    }
    render() {
        return (
            <div className="text-center">
                <form className="form-signin">
                    <h1 className="h3 mb-3 font-weight-normal">Sign In</h1>

                    <label for="inputEmail" className="sr-only">Email address</label>
                    <input type="text" className="form-control" placeholder="Username" name="username" required="" autofocus="" value={this.state.username} onChange={this.textChanged} />

                    <label for="inputPassword" className="sr-only">Password</label>
                    <input type="password" className="form-control" placeholder="Password" name="password" required="" value={this.state.password} onChange={this.textChanged} />

                    <button className="btn btn-lg btn-primary btn-block" disabled={this.state.isRequest} type="button" onClick={this.onSignIn}>Sign in</button>
                    <p className="mt-5 mb-3 text-muted">© 2017-2018</p>
                </form>
            </div>
        )
    }
}

export default Login