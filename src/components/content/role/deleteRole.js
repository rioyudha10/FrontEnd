import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import axios from 'axios'
import apiconfig from '../../../configs/api.config.json'
import {deleteRole} from "../../../actions/roleAction"
import PropTypes from "prop-types";
import { connect } from 'react-redux'

class DeleteRole extends React.Component {
    constructor(props) {
        super(props)
        this.deleteHandler = this.deleteHandler.bind(this)
    }
    

    deleteHandler(){
        this.props.deleteRole(this.props.role_del._id)
        //alert(JSON.stringify(this.props.role_del._id))
        this.props.closeModalHandler()
    }

    render(){
        return(
            <Modal isOpen={this.props.delete} className={this.props.className}>
                <ModalHeader> Delete Role  </ModalHeader>
                <ModalBody >
                    <p> Beneran mau hapus <strong> Role {this.props.role_del.name} </strong> ?  </p>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.deleteHandler}>Yes</Button>
                    <Button color="danger" onClick={this.props.closeModalHandler}>No</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

DeleteRole.propTypes = {
    deleteRole : PropTypes.func.isRequired,
    role: PropTypes.object.isRequired
  };

const mapStateToProps = state => ({
role : state.role
})

export default connect(
    mapStateToProps,
    {deleteRole}
  )(DeleteRole);