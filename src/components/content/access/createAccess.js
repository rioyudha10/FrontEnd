import React from "react";
import ReactDOM from "react-dom";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import { Alert } from "reactstrap";
import PropTypes from "prop-types";
import classNames from "classnames";
import MenuItem from "@material-ui/core/MenuItem";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import { withStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import axios from "axios";
import apiconfig from "../../../configs/api.config.json";
import OutlinedInput from "@material-ui/core/OutlinedInput";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit * 3,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

class CreateAccess extends React.Component {
  constructor(props) {
    super(props);
    let userdata = JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA));
    this.state = {
      formdata: {
        m_role_id: "", 
        m_menu_id: [],
        created_by: userdata.username,
        update_by: userdata.username
      },
      alertData: {
        status: false,
        message: ""
      },
      labelWidth: 0,
      role: [],
      menu: [],
      checkedOne : false,
      theRole: '',
      open: false,
      nilai: (len)=>{
          let samsul = [];
          for(let i=0; i<len; i++){
              samsul.push(0);
          }
          return samsul;
      },
      nilai2:[],
      nilai3:[]
    };

    this.submitHandler = this.submitHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getListRole();
    this.getListMenu();
  }

  changeHandler(e) {
    let tmp = this.state.formdata;
    tmp[e.target.name] = e.target.value;
    this.setState({
      alertData: {
        status: false,
        message: ""
      },
      formdata: tmp
    });
  }

  getListRole() {
    let token = localStorage.getItem(apiconfig.LS.TOKEN);
    let option = {
      url: apiconfig.BASE_URL + apiconfig.ENDPOINTS.ROLE,
      method: "get",
      headers: {
        Authorization: token
      }
    };
    axios(option)
      .then(response => {
        this.setState({
          role: response.data.message
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  getListMenu() {
    let token = localStorage.getItem(apiconfig.LS.TOKEN);
    let option = {
      url: apiconfig.BASE_URL + apiconfig.ENDPOINTS.MENU,
      method: "get",
      headers: {
        Authorization: token
      }
    };
    //alert(this.state.menu)
    axios(option)
      .then(response => {
        this.setState({
          menu: response.data.message
        });
        //alert(JSON.stringify(this.state.menu))

      })
      .catch(error => {
        console.log(error);
      });
      this.state.nilai3 = this.state.nilai(this.state.menu.length);
  }

  submitHandler() {
   //alert(this.state.nilai2);
    // if (this.state.formdata.m_role_id === "" || this.state.formdata.m_menu_id === "" ){
    //   this.setState({
    //     alertData: {
    //       status: true,
    //       message: "all forms must be filled!"
    //     }
    //   });
    // } 
   // else {
      let token = localStorage.getItem(apiconfig.LS.TOKEN);
      this.state.formdata.m_menu_id = this.state.nilai2;
      if(this.state.formdata.m_menu_id !=''){
        let option = {
            url: apiconfig.BASE_URL + apiconfig.ENDPOINTS.ACCESS + '/' + this.state.formdata.m_role_id,
            method: "put",
            headers: {
              Authorization: token,
              "Content-Type": "application/json"
            },
            data: this.state.formdata
          };
          //alert(JSON.stringify(this.state.formdata));
          axios(option)
            .then(response => {
              //if (response.data.code === 200) {
                //alert(JSON.stringify(this.state.formdata))
                this.props.closeHandler();
                this.props.history.push("/accessmenu");
              
            //    else {
            //     alert(response.data);
                
            //   }
            })
            .catch(error => {
              console.log(error);
            });
        //}
      }
      else{
          alert("Fill the Role!!")
      }

  }

  handleChange = (name) => event => {
    this.setState({ [name]: event.target.checked });
    let index = (parseInt(event.target.value[4]-1));
    if(event.target.checked){
        this.state.nilai3[index] = this.state.menu[index].controller;
        this.state.nilai2 = this.state.nilai3.filter(e=>e!=0);
        //alert(this.state.menu[index].controller.filter((content)=>));
        ;
    }
    else{
        this.state.nilai3[index] = 0
        this.state.nilai2 = this.state.nilai3.filter(e=>e!=0);
        //alert(this.state.nilai2);
    }    
  };
  handleChangeDropdown = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.state.formdata.m_role_id = event.target.value;
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const { classes } = this.props;

    return (
      <Modal isOpen={this.props.create} className={this.props.className}>
        <ModalHeader>Add Access</ModalHeader>
        <ModalBody>
        <form autoComplete="off">
      
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="demo-controlled-open-select">Role</InputLabel>
          <Select
            open={this.state.open}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            value={this.state.theRole}
            onChange={this.handleChangeDropdown}
            inputProps={{
              name: 'theRole',
              id: 'demo-controlled-open-select',
            }}
          >
            {this.state.role.map((row)=>{
                return <MenuItem value={row.code}>{row.name}</MenuItem>
            })}
          </Select>
        </FormControl>
      </form>
          {/* <div className={classes.container}>
            <formControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="role">Role Description</InputLabel>
              <Select>
                {this.state.role.map((row, index) => {
                  return <MenuItem value={row.code}>{row.name}</MenuItem>;
                })}
              </Select>
            </formControl>
          </div> */}
          <div className={classes.container}>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Assign responsibility</FormLabel>
              
              <FormGroup>
                {this.state.menu.map((row, index) => {
                  return (
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={this.handleChange(String(row.name))}
                          value={row.code}
                        />
                      }
                      label={row.name}
                    />
                  );
                })}
              </FormGroup>
              <FormHelperText>Be careful</FormHelperText>
            </FormControl>
          </div>
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

CreateAccess.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreateAccess);
