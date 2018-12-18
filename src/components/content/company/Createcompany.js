import React from "react";
import ReactDOM from "react-dom";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import { Alert } from "reactstrap";
import PropTypes from "prop-types";
import classNames from "classnames";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import { withStyles } from "@material-ui/core/styles";
import Select from 'react-select'
import InputLabel from "@material-ui/core/InputLabel";
import axios from "axios";
import apiconfig from "../../../configs/api.config.json";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Grid from "@material-ui/core/Grid";

import { connect } from "react-redux";
import { createCompanies } from "../../../actions/companyAction";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

class CreateCompany extends React.Component {
  constructor(props) {
    super(props);
    let userdata = JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA));
    this.state = {
        code: "",
        name: "",
        email: "",
        provinsi: "",
        kota: "",
        address: "",
        phone: "",
        created_by: userdata.username,
      alertData: {
        status: false,
        message: ""
      },
      labelWidth: 0,
      prov: [],
      city: [],
      selectedOption:"",
      selectedOption2:"",
    };

    this.submitHandler = this.submitHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }

  componentDidMount() {
    this.getListProvince();
    this.getListCity();
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

  getListProvince() {
    let token = localStorage.getItem(apiconfig.LS.TOKEN);
    let option = {
      url: apiconfig.BASE_URL + apiconfig.ENDPOINTS.ADDRESS.PROVINCE,
      method: "get",
      headers: {
        Authorization: token
      }
    };
    axios(option)
      .then(response => {
        this.setState({
          prov: response.data.message
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  getListCity() {
    let token = localStorage.getItem(apiconfig.LS.TOKEN);
    let option = {
      url: apiconfig.BASE_URL + apiconfig.ENDPOINTS.ADDRESS.CITY
      ,
      method: "get",
      headers: {
        Authorization: token
      }
    };
    axios(option)
      .then(response => {
        this.setState({
          city: response.data.message
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleChange1 = (selectedOption) => {
    this.setState({
        selectedOption,
        provinsi:selectedOption.value
    });
  };

  handleChange2 = (selectedOption) => {
    this.setState({
        selectedOption2: selectedOption,
        kota:selectedOption.value
    })
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
        this.state.name === "" ||
        this.state.email === "" ||
        this.state.phone === "" ||
        this.state.address === "" ||
        this.state.provinsi === "" ||
        this.state.kota === ""
      ) {
        this.setState({
          alertData: {
            status: true,
            message: "all forms must be filled!"
          }
        });
      } else if (this.validateEmail(this.state.email) === false) {
        this.setState({
          alertData: {
            status: true,
            message: "invalid email format,type in the email section correctly!"
          }
        });
      } else if (this.validatePhone(this.state.phone) === false) {
        this.setState({
          alertData: {
            status: true,
            message:
              "invalid phone number format,type in the phone number section correctly!"
          }
        });
      } else {
        const formdata={
          code: this.state.code,
          name: this.state.name,
          email: this.state.email,
          province: this.state.provinsi,
          city: this.state.kota,
          address: this.state.address,
          phone: this.state.phone,
          created_by: this.state.created_by,
        }
    this.props.createCompanies(formdata)
    this.props.modalStatus(1, "Created!", this.state.name)
    this.props.closeHandler();
    }
  }

  render() {
    const options1 = []
        this.state.prov.map( row => {
         options1.push({
           value:row.code_p,
           label:row.name_p
        })
    })
    const options2 = []
        this.state.city.map( row => {
         options2.push({
            value:row.code_c,
            label:row.name_c,
            link:row.code_p
        })
    })
    //alert(JSON.stringify(city))

    const filteredOptions = options2.filter((o) => o.link === this.state.selectedOption.value)

    const { classes } = this.props;

    return (
      <Modal isOpen={this.props.create} className={this.props.className}>
        <ModalHeader> Add Company</ModalHeader>
        <ModalBody>
          {/* <form className={classes.container}> */}
          <form>
            <TextField
              name="name"
              label="Name Company"
            //   className={classes.textField}
              value={this.state.name}
              onChange={this.changeHandler}
              margin="normal"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="outlined-email-input"
              label="Email"
            //   className={classes.textField}
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.changeHandler}
              autoComplete="email"
              margin="normal"
              variant="outlined"
              fullWidth
            />
            <TextField
              name="phone"
              label="Phone Number"
            //   className={classes.textField}
              value={this.state.phone}
              onChange={this.changeHandler}
              margin="normal"
              variant="outlined"
              fullWidth
            />
            <TextField
              name="address"
              label="Address"
              defaultValue="Default Value"
              rows="4"
              value={this.state.address}
              onChange={this.changeHandler}
            //   className={classes.textField}
              margin="normal"
              variant="outlined"
              fullWidth
            />
            <formControl variant="outlined" 
            // className={classes.formControl}
            >
              <InputLabel htmlFor="province">Province</InputLabel>
              <Select
                value={this.state.selectedOption}
                onChange={this.handleChange1}
                options={options1}
              />
            </formControl>
            <br />
            <formControl variant="outlined" 
            // className={classes.formControl}
            >
              <InputLabel htmlFor="city">City</InputLabel>
              <Select
                value={this.state.selectedOption2}
                onChange={this.handleChange2}
                options={filteredOptions}
              />
            </formControl>
          </form>
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

CreateCompany.propTypes = {
    classes: PropTypes.object.isRequired,
    createCompanies: PropTypes.func.isRequired,
    company: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    company: state.company
  });
  
  export default connect(
    mapStateToProps,
    { createCompanies }
  )(CreateCompany);