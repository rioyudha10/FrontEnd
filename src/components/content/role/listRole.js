import React, { Component } from "react";
import API from "../../../helpers/API";
import apiconfig from "../../../configs/api.config.json";
import axios from "axios";
import { Link } from "react-router-dom";
import { Alert } from "reactstrap";
import $ from "jquery";
import {getRoles} from "../../../actions/roleAction"
import { connect } from 'react-redux'

import EditRole from "./editRole";
import CreateRole from "./Createrole";
import DeleteRole from "./deleteRole";
import ViewRole from "./viewRole";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import Paper from "@material-ui/core/Paper";
import Hidden from "@material-ui/core/Hidden";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import AddIcon from "@material-ui/icons/Add";
import Grid from "@material-ui/core/Grid";

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5
  }
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1)
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, {
  withTheme: true
})(TablePaginationActions);

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700,
    hidden: true
  },
  button: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

class ListRole extends React.Component {
  constructor(props){
    super(props)
    this.state={
        search: "",
        result:[],
        result1:[],
        page:0,
        rowsPerPage:5,
        currentRole:{},
    };
      this.changeHandler = this.changeHandler.bind(this);
      //this.showHandler=this.showHandler.bind(this)
      //this.submitHandler=this.submitHandler.bind(this)
      // this.changeHandler=this.changeHandler.bind(this)
      //this.unitHandler=this.unitHandler.bind(this)
      this.closeModalHandler = this.closeModalHandler.bind(this)
      // this.closeHandler=this.closeHandler.bind(this)
      // this.deleteHandler=this.deleteHandler.bind(this)
      this.deleteModalHandler = this.deleteModalHandler.bind(this)
      this.viewModalHandler = this.viewModalHandler.bind(this)
      // this.editModalHandler = this.editModalHandler.bind(this)
      // this.modalStatus = this.modalStatus.bind(this)
  }

  componentDidMount() {
    this.props.getRoles()
  }

  componentWillReceiveProps(newProps){
    this.setState({
      result:newProps.role.roles,
      result1:newProps.role.roles
    })
  }

  closeModalHandler() {
    this.setState({
        viewRole : false,
        editRole : false,
        deleteRole : false    
    })
  }

  viewModalHandler(roleid) {
    let tmp = {}
    this.state.result.map((ele) => {
        if (roleid == ele._id) {
            tmp = ele
        }
    })
    this.setState({
        currentRole : tmp,
        viewRole : true
    })
  }

  deleteModalHandler(roleid) {
    let tmp = {}
    this.state.result1.map((ele) => {
        if (roleid == ele._id) {
            tmp = ele
        }
    })
    this.setState({
        currentRole : tmp,
        deleteRole : true
    })
    //alert(JSON.stringify(this.state.currentCompany))
  }

  changeHandler(e) {
    //alert(JSON.stringify(this.state.menuaccess));
    let test = [];
    let search = e.target.value;
    let patt = new RegExp(search.toLowerCase());

    this.state.result.map(ele => {
        if (
        patt.test(ele.code.toLowerCase()) ||
        patt.test(ele.name.toLowerCase())
        ) {
        test.push(ele);
        }
    });
    this.setState({
        result1: test
    });
  }
  
  handleChangePage = (event, page) => {
    this.setState({ page });
  };
  
  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { classes } = this.props;
    //const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    const {roles} = this.props.role
    //alert(companies)
    return (
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Paper>
              <ul class="breadcrumb">
                <li>
                  <a href="/role">Home</a> <span class="divider">/</span>
                </li>
                <li>
                  <a href="#">Master</a> <span class="divider">/</span>
                </li>
                <li class="active">List Role</li>
              </ul>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <h4>List Role</h4>
            {/* {
                (this.state.alertData.status == 1) ? <Alert color ="success"> {this.state.alertData.message} </Alert>:''
            }
            {
                (this.state.alertData.status == 2) ? <Alert color ="danger"> {this.state.alertData.message} </Alert>: ''
            } */}
                <button type="button" class="btn btn-primary float-right"
                onClick ={this.showHandler}> Add </button>
                <CreateRole
                create = {this.state.showCreateRole}
                closeHandler={this.closeHandler} />
                <ViewRole
                view = {this.state.viewRole}
                closeModalHandler = {this.closeModalHandler} 
                role = {this.state.currentRole}
                />
                <DeleteRole
                delete = {this.state.deleteRole}
                role_del = {this.state.currentRole}
                closeModalHandler = {this.closeModalHandler}
                modalStatus = {this.modalStatus}
                 />
                <EditRole
                edit = {this.state.editRole}
                closeModalHandler = {this.closeModalHandler}
                roletest = {this.state.currentRole} 
                modalStatus = {this.modalStatus}
                />
                <br/> <br/>
          </Grid>
          <Grid item xs={12}>
            <Hidden>
              <Paper>
                <Table >
                  <TableHead>
                    <TableRow>
                      <TableCell>Role Code</TableCell>
                      <TableCell>Role Name</TableCell>
                      <TableCell>Created By</TableCell>
                      <TableCell>Created Date</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.result1.slice(
                        this.state.page * this.state.rowsPerPage,
                        this.state.page * this.state.rowsPerPage +
                        this.state.rowsPerPage
                      ).map(role => {
                        return (
                          <TableRow key={role._id}>
                            <TableCell component="th" scope="row">
                              {role.code}
                            </TableCell>
                            <TableCell>{role.name}</TableCell>
                            <TableCell>{role.created_by}</TableCell>
                            <TableCell>{role.created_date}</TableCell>
                            <TableCell>
                              <Link to="#">
                                <SearchIcon
                                  onClick={() => {
                                    this.viewModalHandler(role._id);
                                  }}
                                />
                              </Link>
                              <Link to="#">
                                <CreateOutlinedIcon
                                  onClick={() => {
                                    this.editModalHandler(role._id);
                                  }}
                                />
                              </Link>
                              <Link to="#">
                                <DeleteOutlinedIcon
                                  onClick={() => {
                                    this.deleteModalHandler(role._id);
                                  }}
                                />
                              </Link>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        colSpan={3}
                        count={this.state.result1.length}
                        rowsPerPage={this.state.rowsPerPage}
                        page={this.state.page}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActionsWrapped}
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
              </Paper>
            </Hidden>
          </Grid>
        </Grid>
    );
  }
}

ListRole.propTypes = {
  getRoles : PropTypes.func.isRequired,
  role: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  role : state.role
})

export default connect(
  mapStateToProps,
  {getRoles}
)(ListRole);
