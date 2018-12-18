import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import axios from 'axios'
import apiconfig from '../../../configs/api.config.json'

class CreateRole extends React.Component {
    constructor(props) {
        super(props)
        // let number=this.props.role
        // console.log(number)
        //let userdata=JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA))
        // let userdata=""

        // if(localStorage.getItem(apiconfig.LS.TOKEN)!=null){
        let userdata = JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA))
        //alert(JSON.stringify(userdata))
        //}
        this.state = {
            formdata: {
                code: '',
                name: '',
                description: '',
                created_by: userdata.username,
                created_date: new Date().toDateString()
            }
        }
        // let number=this.state.ROLE.length
        this.submitHandler = this.submitHandler.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
    }
    changeHandler(e) {
        let tmp = this.state.formdata
        tmp[e.target.name] = e.target.value
        this.setState({
            formdata: tmp
        })
    }
    // changeHandlerNumber(e) {
    //     if (this.state.formdata != ) {
    //         alert("Phone harus nomer")
    //     } else {
    //         let tmp = this.state.formdata
    //         tmp[e.target.name] = e.target.value
    //         this.setState({
    //             formdata: tmp
    //         })
    //     }
    // }
    submitHandler() {
        // let email = this.state.formdata.email
        // let phone = this.state.formdata.phone
        // let name = this.state.formdata.name
        // let regEmail = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        // let regPhone = /^[0-9\-\+]{9,15}$/
        // if (regPhone.test(phone) && regEmail.test(email) && (name != '')) {
            alert(JSON.stringify(this.state.formdata))
            let token = localStorage.getItem(apiconfig.LS.TOKEN)
            let option = {
                url: apiconfig.BASE_URL + apiconfig.ENDPOINTS.ROLE,
                method: "post",
                headers: {
                    "Authorization": token,
                    "Content-Type": "application/json"
                },
                data: this.state.formdata
            }
            axios(option)
                .then((response) => {
                    if (response.data.code === 200) {
                        alert('Success')
                        //console.log(response)
                        this.props.history.push('/dashboard')
                    } else {
                        alert(response.data.message)
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        // } else if (name== ''){
        //         alert ("Name Role tidak valid")
        // } else if (!regEmail.test(email)){
        //     alert("e-mail tidak valid")
        // } else if (!regPhone.test(phone)){
        //     alert("Nomor telpon tidak valid")
        // }
    }
    render() {
        return (

            <Modal isOpen={this.props.create} className={this.props.className}>
                <ModalHeader> Add Role</ModalHeader>
                <ModalBody >
                    <form class="form-inline">
                        <div class="input-group mb-3 input-group-sm">
                            <label for="text">Role Code</label>
                            <input type="text" class="form-control" placeholder={this.state.code} readOnly
                                name="code" value={this.state.formdata.code} onChange={this.changeHandler} />
                            <label for="text">Role Name</label>
                            <input type="text" class="form-control" placeholder="Role Name"
                                name="name" value={this.state.formdata.name} onChange={this.changeHandler} required="required" />
                        </div>
                    </form>
                    <form class="form-inline">
                        <div class="input-group mb-3 input-group-sm">
                            <label>Description</label>
                            <input type="text" class="form-control" placeholder="Description"
                                name="description" value={this.state.formdata.description} onChange={this.changeHandler} required />
                            {/* <label for="text">address</label>
                            <textarea type="text-area" class="form-control" placeholder="address"
                                name="address" value={this.state.formdata.address} onChange={this.changeHandler} required /> */}

                        </div>
                        <form class="form-inline">
                            <div class="input-group mb-3 input-group-sm">
                                {/* <label>phone</label>
                                <input type="text" class="form-control" placeholder="phone"
                                    name="phone" value={this.state.formdata.phone} onChange={this.changeHandler} required /> */}

                            </div>
                        </form>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.submitHandler}>Save</Button>
                    <Button color="warning" onClick={this.props.closeHandler}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }
}
export default CreateRole