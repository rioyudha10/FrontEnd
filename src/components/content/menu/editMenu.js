import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import { Alert } from "reactstrap";
import PropTypes from "prop-types";
import { putMenu } from "../../../actions/menuActions";
import TextField from "@material-ui/core/TextField";
import apiconfig from "../../../configs/api.config.json";
import { connect } from "react-redux";

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

class EditMenu extends React.Component {
  constructor(props) {
    super(props);
    let userdata = JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA));
    // super(props);
    this.state = {
      formdata: {
        code: "",
        name: "",
        controller: "",
        parent_id: "",
        update_by: userdata.usename
      },
      status: "",
      alertData: {
        status: false,
        message: ""
      }
    };
    this.submitHandler = this.submitHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
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

  submitHandler() {
    if (
      this.state.formdata.code === "" ||
      this.state.formdata.name === "" ||
      this.state.formdata.controller === "" ||
      this.state.formdata.parent_id === ""
    ) {
      this.setState({
        alertData: {
          status: true,
          message: "all forms must be filled!"
        }
      });
    } else {
      this.props.putCompanies(this.state.formdata);
      this.props.closeModalHandler();
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      formdata: newProps.menutest,
      status: newProps.bujang.statusPUT
    });
  }

  render() {
    const { classes } = this.props;
    this.state.status == 200
      ? this.props.modalStatus(1, "Updated!", this.state.formdata.code)
      : console.log(this.state.status);
    return (
      <Modal isOpen={this.props.edit} className={this.props.className}>
        <ModalHeader> Edit Menu</ModalHeader>
        <ModalBody>
          <form class="form-inline">
            <div class="input-group mb-3 input-group-sm">
              <label for="text"> Menu Code : </label>
              <input
                type="text"
                class="form-control"
                readOnly
                name="code"
                value={this.state.formdata.code}
                onChange={this.changeHandler}
              />
              <label for="text"> Menu Name : </label>
              <input
                type="text"
                class="form-control"
                name="name"
                value={this.state.formdata.name}
                onChange={this.changeHandler}
              />
            </div>
            <div class="input-group mb-3 input-group-sm">
              <label for="text"> URL : </label>
              <input
                type="text"
                class="form-control"
                name="controller"
                value={this.state.formdata.controller}
                onChange={this.changeHandler}
              />
              <label for="text"> Parent : </label>
              <input
                type="text"
                class="form-control"
                name="parent_id"
                value={this.state.formdata.parent_id}
                onChange={this.changeHandler}
              />
            </div>
          </form>
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

EditMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  putCompanies: PropTypes.func.isRequired,
  bujang: PropTypes.object.isRequired
};

const mapStatetoProps = state => ({
  bujang: state.company
});

export default connect(
  mapStatetoProps,
  { putMenu }
)(EditMenu);
