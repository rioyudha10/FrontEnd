import React from 'react'
//import {switch,route} from 'react-router-dom'

import Header from '../components/Header'
import Sidebar from  '../components/Sidebar'
//import Login from './login'
import DashboardSwitcher from './DashboardSwitcher'

class Dashboard extends React.Component {
    render () {
        return (
            <div>
                <Header />
                <div className = "container-fluid">
                    <div className = "row">
                        <Sidebar/>
                        <DashboardSwitcher />
                    </div>
                </div>
            </div>
        )
    } 
}

export default Dashboard
