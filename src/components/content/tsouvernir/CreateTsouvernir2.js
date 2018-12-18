
import React from "react";
import axios from 'axios'
import apiconfig from "../../../configs/api.config.json"
import Select from 'react-select'
import Option from 'react-select'
class IncorporationForm extends React.Component {
    constructor() {
      super();
      this.state = {
        name: '',
        shareholders: [],
        sov: [],
        selectedOption2 : "",
        m_souvenir_id : ""

      };
    }
  
    // ...
  
    handleShareholderNameChange = (idx) => (evt) => {
      const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
        if (idx !== sidx) return shareholder;
        return { ...shareholder, [evt.target.name]: evt.target.value };
      });
  
      this.setState({ shareholders: newShareholders });
    }
  
    handleSubmit = (evt) => {
      const { name, shareholders } = this.state;
      alert(`Incorporated: ${name} with ${JSON.stringify(shareholders)} shareholders`);
    }
  
    handleAddShareholder = () => {
      this.setState({
        shareholders: this.state.shareholders.concat([{ 
          m_souvenir_id: ''
        , qty:''
        , note:'' }]),
      });
    }
    
    SubmitHandler = () =>{
      let token = localStorage.getItem(apiconfig.LS.TOKEN);
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.SOUV,
            method: "post",
            headers:{
                "Authorization": token,
                "Content-Type" : "application/json"
            },
            data: this.state.shareholders   
        }
           axios(option).then((response) => { 
                if(response.data.code === 200) {
                    this.props.modalStatus(1, (this.state.shareholders.length + " datas has been updated!"));
                    this.props.history.push('/dashboard');
                } else {
                    alert(response.data.message);
                }
            })
            .catch((error) => {
                console.log(error);            
             }) 
        //this.props.closeModalHandler()

        // axios(option).then((response) => { 
        //     if(response.data.code === 200) {
        //         this.props.modalStatus(1, ("Data updated! " + this.state.formdata.code + " has been updated!"));
        //         this.props.history.push('/dashboard');
        //     } else {
        //         alert(response.data.message);
        //     }
        // })
        // .catch((error) => {
        //     console.log(error);            
        // })
        alert(JSON.stringify(this.state.shareholders))
    }

    handleRemoveShareholder = (idx) => () => {
      this.setState({
        shareholders: this.state.shareholders.filter((s, sidx) => idx !== sidx)
      });
    }

    handleChange2 = (selectedOption2) => {
      this.setState({
          selectedOption2,
          m_souvenir_id:selectedOption2.value
      });
    };

    componentDidMount() {
      this. getListSouvenir()
    }

    getListSouvenir() {
      let token = localStorage.getItem(apiconfig.LS.TOKEN);
      let option = {
        url: apiconfig.BASE_URL + apiconfig.ENDPOINTS.SOUVENIR,
        method: "get",
        headers: {
          Authorization: token
        }
      };
      axios(option)
        .then(response => {
          this.setState({
            sov: response.data.message
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  
    render() {
        
        const options2 = []
        options2.push({label:"select souvenir",value : 0})
      this.state.sov.map( row => {
       options2.push({
         value:row.name ,
         label:row.name
      })
    })
    //alert(JSON.stringify(options2))
      return (
        <form onSubmit={this.handleSubmit}>
          {/* ... */}
          <h4>Add items</h4>
  
          {this.state.shareholders.map((shareholder, idx) => (
            <div className="shareholder">
              
              <select value = {shareholder.m_souvenir_id} name  = "m_souvenir_id" onChange={this.handleShareholderNameChange(idx)}>
              {this.state.sov.map(row => <option value={row.code}>{row.name}</option>)}
                <option value="" disabled>
                  {" "}-{" "}
                </option>
              </select>
              {/* <input
                type="text"
                placeholder={`Item ${idx + 1} name`}
                name = "m_souvenir_id"
                value={shareholder.m_souvenir_id}
                onChange={this.handleShareholderNameChange(idx)}
              /> */}
              <input
                type="text"
                placeholder={`Qty ${idx + 1} name`}
                name = "qty"
                value={shareholder.qty}
                onChange={this.handleShareholderNameChange(idx)}
              />
              <input
                type="text"
                placeholder={`Note ${idx + 1} name`}
                value={shareholder.note}
                name = "note"
                onChange={this.handleShareholderNameChange(idx)}
              />
              <button type="button" onClick={this.handleRemoveShareholder(idx)} className="small">Remove row</button>
            </div>
          ))}
          <button type="button" onClick={this.handleAddShareholder} className="small">Add Items</button>
          <button type="button" className="small" onClick = {this.SubmitHandler}>Submit</button>
        </form>
      )
    }
  }

  export default IncorporationForm