import React from "react";
import API from "../../../helpers/API"
import axios from "axios";
import { Link } from "react-router-dom";
import { Alert } from "reactstrap";
import $ from "jquery";
import { getCompanies } from "../../../actions/companyAction";
import { connect } from "react-redux";

import EditCompany from "./editCompany";
import CreateCompany from "./Createcompany";
import DeleteCompany from "./deleteCompany";
import ViewCompany from "./viewCompany";

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

class ListCompany extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      showCreateCompany: false,
      companis: [],
      currentCompany: {},
      alertData: {
        status: 0,
        message: "",
        code: ""
      },
      hasil: [],
      page: 0,
      rowsPerPage: 5
    };
    this.showHandler = this.showHandler.bind(this);
    //   this.submitHandler = this.submitHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    //   this.SearchHandler = this.SearchHandler.bind(this);
    this.closeModalHandler = this.closeModalHandler.bind(this);
    this.closeHandler = this.closeHandler.bind(this);
    // this.deleteHandler = this.deleteHandler.bind(this);
    // this.deleteModalHandler = this.deleteModalHandler.bind(this);
    this.viewModalHandler = this.viewModalHandler.bind(this);
    this.editModalHandler = this.editModalHandler.bind(this);
    this.modalStatus = this.modalStatus.bind(this);
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  deleteModalHandler(companyid) {
    let tmp = {};
    this.state.companis.map(ele => {
      if (companyid == ele._id) {
        tmp = ele;
      }
    });
    this.setState({
      currentCompany: tmp,
      deleteCompany: true
    });
  }

  viewModalHandler(companyid) {
    let tmp = {};
    this.state.companis.map(ele => {
      if (companyid == ele._id) {
        tmp = ele;
      }
    });
    this.setState({
      currentCompany: tmp,
      viewCompany: true
    });
  }

  editModalHandler(companyid) {
    let tmp = {};
    this.state.companis.map(ele => {
      if (companyid == ele._id) {
        tmp = {
          _id: ele._id,
          code: ele.code,
          name: ele.name,
          phone: ele.phone,
          email: ele.email,
          address: ele.address,
          province: ele.province,
          city: ele.city,
          update_by: ele.update_by
        };
        this.setState({
          currentCompany: tmp,
          editCompany: true
        });
      }
    });
  }

  changeHandler(e) {
    let test = [];
    let search = e.target.value;
    let patt = new RegExp(search.toLowerCase());

    this.state.companis.map(ele => {
      if (
        patt.test(ele.code.toLowerCase()) ||
        patt.test(ele.name.toLowerCase())
      ) {
        test.push(ele);
      }
    });
    this.setState({
      hasil: test
    });
  }

  closeModalHandler() {
    this.setState({
      viewCompany: false,
      editCompany: false,
      deleteCompany: false
    });
  }

  showHandler() {
    this.setState({ showCreateCompany: true });
  }

  closeHandler() {
    this.setState({ showCreateCompany: false });
  }

  componentDidMount() {
    this.props.getCompanies();
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      companis: newProps.company.companies,
      hasil: newProps.company.companies
    });
  }

  modalStatus(status, message, code) {
    this.setState({
      alertData: {
        status: status,
        message: message,
        code: code
      },
      viewCompany: false,
      editCompany: false,
      deleteCompany: false
    });
    // this.getListUnit();
  }

  render() {
    const { classes } = this.props;
    // const { rows, rowsPerPage, page } = this.state;
    //const { company } = this.props.bujang;
    return (
      <div>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Paper>
              <ul class="breadcrumb">
                <li>
                  <a href="/company">Home</a> <span class="divider">/</span>
                </li>
                <li>
                  <a href="#">Master</a> <span class="divider">/</span>
                </li>
                <li class="active">List Souvernir Stock</li>
              </ul>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <h4>List Company</h4>
          </Grid>
          <Grid item xs={3} justify="flex-end">
            <Input
              placeholder="Search"
              // className={classes.input}
              name="search"
              onChange={this.changeHandler}
            />
            {/* <Button
              variant="contained"
              className={classes.button}
              onClick={this.SearchHandler}
            >
              Search
            </Button>
            */}
          </Grid>
          <Grid item xs={3} justify="flex-end"> 
          <Button
              variant="contained"
              color="primary"
              size="small"
              // className={classes.button}
              onClick={this.showHandler}
            >
              Add Company
            </Button>
          </Grid>
          <Grid item xs={6}>
            {this.state.alertData.status == 1 ? (
              <Alert color="success">
                <b>Data {this.state.alertData.message}</b> Data company with
                referential code <strong>{this.state.alertData.code} </strong>
                has been {this.state.alertData.message}
              </Alert>
            ) : (
              ""
            )}
            {this.state.alertData.status == 2 ? (
              <Alert color="danger">{this.state.alertData.message} </Alert>
            ) : (
              ""
            )}
          </Grid>
          <DeleteCompany
            delete={this.state.deleteCompany}
            company_del={this.state.currentCompany}
            closeModalHandler={this.closeModalHandler}
            modalStatus={this.modalStatus}
          />
          <ViewCompany
            view={this.state.viewCompany}
            closeModalHandler={this.closeModalHandler}
            company={this.state.currentCompany}
          />
          <CreateCompany
            create={this.state.showCreateCompany}
            closeHandler={this.closeHandler}
            modalStatus={this.modalStatus}
          />
          <EditCompany
            edit={this.state.editCompany}
            closeModalHandler={this.closeModalHandler}
            companytest={this.state.currentCompany}
            modalStatus={this.modalStatus}
          />
          <Grid item xs={12}>
            <Hidden>
              <br />
              <Paper>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>No</TableCell>
                      <TableCell>Company Code</TableCell>
                      <TableCell>Company Name</TableCell>
                      <TableCell>Created By</TableCell>
                      <TableCell>Created Date</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.hasil
                      .slice(
                        this.state.page * this.state.rowsPerPage,
                        this.state.page * this.state.rowsPerPage +
                          this.state.rowsPerPage
                      )
                      .map((row, index) => {
                        return (
                          <TableRow key={row.id}>
                            <TableCell>{index+1+this.state.page * this.state.rowsPerPage}</TableCell>
                            <TableCell component="th" scope="row">
                              {row.code}
                            </TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.created_by}</TableCell>
                            <TableCell>{row.created_date}</TableCell>
                            <TableCell>
                              <Link to="#">
                                <SearchIcon
                                  onClick={() => {
                                    this.viewModalHandler(row._id);
                                  }}
                                />
                              </Link>
                              <Link to="#">
                                <CreateOutlinedIcon
                                  onClick={() => {
                                    this.editModalHandler(row._id);
                                  }}
                                />
                              </Link>
                              <Link to="#">
                                <DeleteOutlinedIcon
                                  onClick={() => {
                                    this.deleteModalHandler(row._id);
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
                        count={this.state.hasil.length}
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
      </div>
    );
  }
}


ListCompany.propTypes = {
  getCompanies: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  company: state.company
});

export default connect(
  mapStateToProps,
  { getCompanies }
)(ListCompany);
