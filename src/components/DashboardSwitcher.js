import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Listcompany from './content/company/listCompany'
import Listrole from './content/role/listRole'
import Listmenu from './content/menu/listMenu'
import Listaccess from './content/access/listAccess'
import Listproduct from './content/product/listProduct'
import Listtsouvernir from "./content/tsouvernir/listTsouvernir"
import ListQuestioner from  "./content/QuestionerHeader/listQuestioner"
import Home from './content/home/home'
//import Test from './content/company/Test'
import {Redirect} from 'react-router'
import apiconfig from '../configs/api.config.json'
import axios from 'axios'


class DashboardSwitcher extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        dataLogin : JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA)),
        dataAccess : [],
        the:[], 
        side:[]
    }
  }

  getListAccess = () =>{
    let token = localStorage.getItem(apiconfig.LS.TOKEN);
    let option = {
      url: apiconfig.BASE_URL + apiconfig.privateRoute.acces,
      method: "get",
      headers: {
        Authorization: token 
      }
    };
    axios(option)
      .then(response => {
        this.setState({
            dataAccess: response.data.message.filter((content)=>content.username === this.state.dataLogin.username)[0].accesmenu
        })
        for(let i=0; i < this.state.dataAccess.length; i++){
          this.state.the.push(this.state.dataAccess[i][1])
          for(let j=2; j < this.state.dataAccess[i].length; j++){
            this.state.the[i] += this.state.dataAccess[i][j];
          }
        }
        
        //alert(JSON.stringify(this.state.the))
        //alert(JSON.stringify(this.state.dataAccess));
        //alert(JSON.stringify(this.state.side))
      })
      .catch(error => {
        console.log(error);
      });
      
  }

  componentDidMount() {
    this.getListAccess();
  }

  func = (inp)=>{
    if(inp == "/dashboard"){
      return Home;
    }
    else if(inp == "/company"){
      return Listcompany;
    }
    else if(inp == "/menu"){
      return Listmenu;
    }
    else if(inp == "/role"){
      return Listrole;
    }
    else if(inp == "/access"){
      return Listaccess;
    }
    else if(inp == "/product"){
      return Listproduct;
    }
    else if(inp == "/tsouvernir"){
      return Listtsouvernir;
    }
    else if(inp == "/quest"){
      return ListQuestioner;
    }
  }
  
  render () {
    return(
      <main role='main' class= 'col-md-9 ml-sm-auto col-lg-10 pt-3 px-4'>
        <Switch>
        { this.state.dataAccess.map((content, index)=>{
                    return <PrivateRoute path={content} component={this.func(this.state.dataAccess[index])} />  
                  })}
        {/* <PrivateRoute path='/dashboard' component = {Listcompany}/>
        <PrivateRoute path='/role' component = {Listrole}/>
        <PrivateRoute path='/menu' component = {Listmenu}/>
        <PrivateRoute path='/access' component = {Listaccess}/> */}
        </Switch>
      </main>
    )
  }
}
  
const PrivateRoute = ({component: Component, ...rest})=>(
  <Route
    {...rest}
    render = {props=>
      localStorage.getItem(apiconfig.LS.TOKEN)!=null? (<Component {...props}/>):(
        <Redirect
          to={{
            pathname :'/',
            state:{from: props.location}
          }}
          />
      )
    }
    />
)
export default DashboardSwitcher