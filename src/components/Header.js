import React from 'react'
import {Link} from 'react-router-dom'
import apiconfig from "../../src/configs/api.config.json";

class Header extends React.Component {

    constructor(props) {
        super(props);
        let userdata = JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA));
    
        super(props);
        this.state = {
            nama : userdata.username
        };
      }

    onSignOut(){
        localStorage.clear();
        this.props.history.push('/')
    }
    
    render(){
        return (
            <nav className = "navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
                < a className = "navbar-barnd col-sm-3 col-md-2 mr-0" href = "#">Batch 176 - Mini Project App</a>
                < a className = "navbar-barnd col-sm-3 col-md-2 mr-0" href = "#"><h5> Hallo {this.state.nama}</h5></a>
                <ul className ="navbar-nav px-3">
                    <li className = "nav-item text-newrop">
                        <Link className = 'nav-link' to = "" onClick = {this.onSignOut}>Sign Out</Link>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Header