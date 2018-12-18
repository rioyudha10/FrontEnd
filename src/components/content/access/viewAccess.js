import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import apiconfig from "../../../configs/api.config.json";

const styles = theme => ({
  root: {
    width: "100%",
    flexGrow: 1
  },
  table: {
    minWidth: 700
  }
});

class ViewCompany extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Modal isOpen={this.props.view} className={this.props.className}>
        <ModalHeader> View Unit</ModalHeader>
        <ModalBody>
          <div>
            <h3>{this.props.access.m_role_id} </h3>
          </div>
          <div className={classes.root}>
            <Grid container spacing={24}>
              <Grid item xs={6}>
                Role Code
                <br />
                Role Name
                <br />
                Menu Code
              </Grid>
              <Grid item xs={6}>
                {this.props.access.m_role_id}
                <br />
                {this.props.access.m_role_name}
                <br />
                {this.props.access.m_menu_id}
              </Grid>
            </Grid>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={this.props.closeModalHandler}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

ViewCompany.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ViewCompany);
