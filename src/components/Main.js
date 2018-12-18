import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from '../components/login'
import Dashboard from '../components/Dashboard'
import apiconfig from '../configs/api.config.json'


const Main = ()=>{
  console.log("Main")
  return (
    <main>
      <Switch>
        <Route exact path='/' render={()=>(
          localStorage.getItem(apiconfig.LS.TOKEN)==null ? (<Route exact path = '/' component = {Login}/>) : (<Dashboard/>)
        )}/>
        <Dashboard />
      </Switch>
    </main>
  )
}
export default Main