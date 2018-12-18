import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button, Input, Label, FormGroup } from "reactstrap";
import { Alert } from "reactstrap";
import PropTypes from "prop-types";
import apiconfig from "../../../configs/api.config.json";
import { connect } from "react-redux";
import { createHandler } from "../../../actions/DetailAction";

class CreateProduct extends React.Component {
  constructor(props) {
    super(props);
    let userdata = JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA));
    
    this.state = {
        q_no: "",
        q_question: "",
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
        q_no: this.state.q_no,
        q_question: this.state.q_question,
      }
        this.props.createHandler(formdata);
        this.props.closeHandler();
        this.props.closeModalHandler();

    }
  }

  render() {

    const { classes } = this.props;

    return (
    
      <Modal isOpen={this.props.create} className={this.props.className}>
        <ModalHeader> Form Qustioner</ModalHeader>
        <ModalBody>
          <FormGroup>
              <Label for="">No</Label>
              <Input type="text" name="q_no"  value={this.state.q_no} onChange={this.changeHandler}/>
            </FormGroup>
          <FormGroup>
            <Label for="">Questions</Label>
            <Input type="textarea" name="q_question"  placeholder="" value={this.state.q_question}  onChange={this.changeHandler} />
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