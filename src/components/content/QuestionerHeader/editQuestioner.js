import React from 'react'
import { Modal, Input, ModalBody, ModalFooter, ModalHeader, Button, Label, FormGroup, Alert, Row, Table } from 'reactstrap'
import axios from 'axios'
import apiconfig from '../../../configs/api.config.json'
import {updateQuestioner} from '../../../actions/QusetionerAction'
import {connect} from 'react-redux'
import PropTypes from "prop-types";
import CreateAccess from "./formQustioner";
import { TableHead, TableCell, TableBody } from '@material-ui/core';

class EditProduct extends React.Component {
    constructor (props) {
        super(props)
        super(props);
        this.state = {
            showCreateAccess: false,
            formdata: {
                q_code : '',
                q_name: '',
                q_type: '',
            },
            alertData: {
                status: false,
                message: ""
            },
        }
        this.submitHandler = this.submitHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.showHandler = this.showHandler.bind(this);
        this.modalStatus = this.modalStatus.bind(this);
        this.closeHandler = this.closeHandler.bind(this);
        this.closeModalHandler = this.closeModalHandler.bind(this);
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            formdata : newProps.editQuest
        });
    }

    closeModalHandler() {
        this.setState({
          viewAccess: false,
          editAccess: false,
          deleteAccess: false
        });
    }

    showHandler() {
        this.setState({ showCreateAccess: true });
    }

    closeHandler() {
        this.setState({ showCreateAccess: false });
    }

    modalStatus(status, message, code) {
        this.setState({
          alertData: {
            status: status,
            message: message,
            code: code
          },
          viewAccess: false,
          editAccess: false,
          deleteAccess: false
        });
      }
 
    changeHandler(e) {
        let tmp = this.state.formdata;
        tmp[e.target.name] = e.target.value;
        this.setState({
            formdata:tmp
        })   
    }

    submitHandler() {
            let data = this.state.formdata
            this.props.updateQuestioner(data);
            // this.props.modalStatus(1, ("Data updated! " + this.state.formdata.code + " has been updated!"));    
    }
    
    render(){
      // alert(JSON.stringify(this.state.formdata))
        //console.log("ini isi formdata", this.state.formdata)
        return(
            <Modal isOpen={this.props.edit} className={this.props.className}>
                <ModalHeader> View Questinor</ModalHeader>
                <CreateAccess
                    create={this.state.showCreateAccess}
                    closeHandler={this.closeHandler}
                    closeModalHandler={this.closeModalHandler}
                />
                <ModalBody >
                    <FormGroup>
                        <Label for="">Code</Label>
                        <Input type="text" name="q_code" value={this.state.formdata.q_code} placeholder="Auto Denerate" readOnly />
                    </FormGroup>
                    <FormGroup>
                        <Label for="">Name</Label>
                        <Input type="text" name="q_name"  placeholder="" value={this.state.formdata.q_name}  onChange={this.changeHandler} />
                    </FormGroup>
                    {/* <FormGroup>
                        <Label for="">Type</Label>
                        <Input type="text" name="q_type"  placeholder="" value={this.state.formdata.q_type}  onChange={this.changeHandler} />
                    </FormGroup> */}
                    <FormGroup>
                        <Label for="">Type</Label>
                            <Input type="select" name="q_type" value={this.state.formdata.q_type} onChange={this.changeHandler} >
                            <option>Combo</option>
                            <option>Personality</option>
                            <option>Technical</option>
                            </Input>
                    </FormGroup>
                    <FormGroup>
                        <Row>
                            <Button color="primary" onClick ={this.submitHandler}>Save</Button>
                            <Button color="warning" onClick={this.props.closeModalHandler}>Close</Button>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" onClick={this.handleAddItem}  onClick={this.showHandler}>
                            Add Point
                        </Button>
                    </FormGroup>
                    <FormGroup>
                       <Table>
                           <TableHead>
                               <TableCell>no</TableCell>
                               <TableCell>question</TableCell>
                               <TableCell>Edit</TableCell>
                           </TableHead>
                       </Table>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    {this.state.alertData.status == true ? (
                        <Alert color="danger">{this.state.alertData.message} </Alert>
                    ) : (
                        ""
                    )}
                    {/* <Button color="primary" onClick ={this.submitHandler}>Save</Button>
                    <Button color="warning" onClick={this.props.closeModalHandler}>Close</Button> */}
                </ModalFooter>
            </Modal>
        )
    }
}

EditProduct.propTypes = {
    classes: PropTypes.object.isRequired
};
  
export default connect(null, {updateQuestioner})(EditProduct);