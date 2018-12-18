import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  root: {
    width: "100%",
    flexGrow: 1
  },
  table: {
    minWidth: 700
  }
});

class ViewMenu extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Modal isOpen={this.props.view} className={this.props.className}>
        <ModalHeader> View Unit</ModalHeader>
        <ModalBody>
          <div>
            <h3>{this.props.menu.code} </h3>
          </div>
          <div className={classes.root}>
            <Grid container spacing={24}>
              <Grid item xs={6}>
                Menu Code
                <br />
                Menu Name
                <br />
                Controller
                <br />
                Parent
              </Grid>
              <Grid item xs={6}>
                {this.props.menu.code}
                <br />
                {this.props.menu.name}
                <br />
                {this.props.menu.controller}
                <br />
                {this.props.menu.parent_id}
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

ViewMenu.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ViewMenu);
