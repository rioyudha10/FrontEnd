import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import { Alert } from "reactstrap";
import PropTypes from "prop-types";
import classNames from "classnames";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import apiconfig from "../../../configs/api.config.json";
import {connect} from 'react-redux'
import {updateCompanies} from '../../../actions/companyAction'
const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

class EditCompany extends React.Component {
  constructor(props) {
    super(props);
    let userdata = JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA));

    super(props);
    this.state = {
      formdata: {
        code: "",
        name: "",
        address: "",
        update_by: userdata.usename
      },
      alertData: {
        status: false,
        message: ""
      }
    };
    this.submitHandler = this.submitHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      formdata: newProps.companytest
    });
  }

  changeHandler(e) {
    let tmp = this.state.formdata;
    tmp[e.target.name] = e.target.value;
    this.setState({
      formdata: tmp,
      alertData: {
        status: false,
        message: ""
      }
    });
  }

  validateEmail(email) {
    let regex = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    return regex.test(String(email).toLowerCase());
  }

  validatePhone(phone) {
    let regex = new RegExp(/^[0-9\-\+]{9,15}$/);
    return regex.test(phone);
  }

  submitHandler() {
    if (
      this.state.formdata.name === "" ||
      this.state.formdata.email === "" ||
      this.state.formdata.phone === "" ||
      this.state.formdata.address === ""
    ) {
      this.setState({
        alertData: {
          status: true,
          message: "all forms must be filled!"
        }
      });
    } else if (this.validateEmail(this.state.formdata.email) === false) {
      this.setState({
        alertData: {
          status: true,
          message: "invalid email format,type in the email section correctly!"
        }
      });
    } else if (this.validatePhone(this.state.formdata.phone) === false) {
      this.setState({
        alertData: {
          status: true,
          message:
            "invalid phone number format,type in the phone number section correctly!"
        }
      });
    } else {
        this.props.updateCompanies(this.state);
        this.props.closeModalHandler();
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <Modal isOpen={this.props.edit} className={this.props.className}>
        <ModalHeader> Edit Company</ModalHeader>
        <ModalBody>
          <form >
            <TextField
              name="name"
              label="Name Company"
              // className={classes.textField}
              value={this.state.formdata.name}
              onChange={this.changeHandler}
              margin="normal"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="outlined-email-input"
              label="Email"
              // className={classes.textField}
              type="email"
              name="email"
              value={this.state.formdata.email}
              onChange={this.changeHandler}
              autoComplete="email"
              margin="normal"
              variant="outlined"
              fullWidth
            />
            <TextField
              name="address"
              label="Address"
              defaultValue="Default Value"
              rows="4"
              value={this.state.formdata.address}
              onChange={this.changeHandler}
              // className={classes.textField}
              margin="normal"
              variant="outlined"
              fullWidth
            />
            <TextField
              name="phone"
              label="Phone Number"
              // className={classes.textField}
              value={this.state.formdata.phone}
              onChange={this.changeHandler}
              margin="normal"
              variant="outlined"
              fullWidth
            />
          </form>
          {this.state.alertData.status == true ? (
            <Alert color="danger">{this.state.alertData.message} </Alert>
          ) : (
            ""
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            variant="contained"
            color="primary"
            onClick={this.submitHandler}
          >
            Save
          </Button>
          <Button variant="contained" onClick={this.props.closeModalHandler}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

EditCompany.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(null, {updateCompanies})(EditCompany);
