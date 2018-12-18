import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button, Input, Label, FormGroup } from "reactstrap";
import { Alert } from "reactstrap";
import PropTypes from "prop-types";
import apiconfig from "../../../configs/api.config.json";
import { connect } from "react-redux";
import { createHandler } from "../../../actions/QusetionerAction";

class CreateProduct extends React.Component {
  constructor(props) {
    super(props);
    let userdata = JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA));
    
    this.state = {
      q_code: "",
      q_name: "",
      q_type: "",
      alertData: {
        status: false,
        message: ""
      },
      labelWidth: 0,
    };

    this.submitHandler = this.submitHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler(e) {
    this.setState({
      [e.target.name] : e.target.value,
      alertData: {
        status: false,
        message: ""
      }
    });
  }

  submitHandler(){
    if(this.state.q_code === "" && this.state.q_name === " "){
      this.setState({
        alertData: {
          status: true,
          message: "all forms must be filled!"
        }
      });
    }
    else if(this.state.q_name === ""){
      this.setState({
        alertData: {
          status: true,
          message: "name forms must be filled!"
        }
      });
    }
    else if(this.state.q_code === ""){
      this.setState({
        alertData: {
          status: true,
          message: "code forms must be filled!"
        }
      });
    }
    else {
      const formdata={
        q_code: this.state.q_code,
        q_name: this.state.q_name,
        q_type: this.state.q_type,
      }
    this.props.createHandler(formdata);
    this.props.modalStatus(1, "Created!", this.state.name);
    this.props.closeHandler();
    }
  }

  render() {

    const { classes } = this.props;

    return (
      <Modal isOpen={this.props.create} className={this.props.className}>
        <ModalHeader> Add Product</ModalHeader>
        <ModalBody>
          <FormGroup>
              <Label for="">Code</Label>
              <Input type="text" name="q_code"  value={this.state.q_code} onChange={this.changeHandler}/>
            </FormGroup>
          <FormGroup>
            <Label for="">Name Product</Label>
            <Input type="text" name="q_name"  placeholder="" value={this.state.q_name}  onChange={this.changeHandler} />
          </FormGroup>
          <FormGroup>
            <Label for="">Type</Label>
            <Input type="select" name="q_type" value={this.state.q_type} onChange={this.changeHandler} >
            <option>Combo</option>
            <option>Personality</option>
            <option>Technical</option>
          </Input>
        </FormGroup>
        </ModalBody>
        <ModalFooter>
          {this.state.alertData.status == true ? (
              <Alert color="danger">{this.state.alertData.message} </Alert>
          ) : (
              ""
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={this.submitHandler}
          >
            Save
          </Button>
          <Button variant="contained" onClick={this.props.closeHandler}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

CreateProduct.propTypes = {
    classes: PropTypes.object.isRequired,
    create: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    questHeader: state.questHeader
  });
  
  export default connect(
    mapStateToProps,
    { createHandler }
  )(CreateProduct);