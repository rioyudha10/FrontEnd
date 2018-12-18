import React from "react";
import API from "../../../helpers/API";
import apiconfig from "../../../configs/api.config.json";
import axios from "axios";
import { Link } from "react-router-dom";
import { Alert } from "reactstrap";
import $ from "jquery";

import EditAccess from "./editAccess";
import CreateAccess from "./createAccess";
import DeleteAccess from "./deleteAccess";
import ViewAccess from "./viewAccess";

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

class ListAccess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      showCreateAccess: false,
      // searchResult: true,
      // tableResult: false,
      access: [],
      currentAccess: {},
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
    this.submitHandler = this.submitHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.SearchHandler = this.SearchHandler.bind(this);
    this.closeModalHandler = this.closeModalHandler.bind(this);
    this.closeHandler = this.closeHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
    this.deleteModalHandler = this.deleteModalHandler.bind(this);
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

  deleteModalHandler(accessid) {
    let tmp = {};
    this.state.access.map(ele => {
      if (accessid == ele._id) {
        tmp = ele;
      }
    });
    this.setState({
      currentAccess: tmp,
      deleteAccess: true
    });
  }

  viewModalHandler(accessid) {
    let tmp = {};
    this.state.access.map(ele => {
      if (accessid == ele._id) {
        tmp = ele;
      }
    });
    this.setState({
      currentAccess: tmp,
      viewAccess: true
    });
  }

  editModalHandler(accessid) {
    let tmp = {};
    this.state.access.map(ele => {
      if (accessid == ele._id) {
        tmp = {
          _id: ele._id,
          m_role_id: ele.m_role_id,
          name_role: ele.name_role,
          address: ele.address,
          update_by: ele.update_by
        };
        this.setState({
          currentAccess: tmp,
          editAccess: true
        });
      }
    });
  }

  changeHandler(e) {
    let test = [];
    let search = e.target.value;
    let patt = new RegExp(search.toLowerCase());

    this.state.access.map(ele => {
      if (
        patt.test(ele.m_role_id.toLowerCase()) ||
        patt.test(ele.m_role_name.toLowerCase())
      ) {
        test.push(ele);
      }
    });
    this.setState({
      hasil: test
    });
  }

  SearchHandler() {
    alert(JSON.stringify(this.state.access));
    let test = [];
    let search = this.state.search;
    let patt = new RegExp(search.toLowerCase());

    this.state.access.map(ele => {
      if (
        patt.test(ele.m_role_id.toLowerCase()) ||
        patt.test(ele.m_role_name.toLowerCase())
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
      viewAccess: false,
      editAccess: false,
      deleteAccess: false
    });
  }

  showHandler() {
    this.setState({ showCreateAccess: true });
  }

  closeHandler() {
    this.setState({ showCreateAccess: false });
  }

  submitHandler() {
    let token = localStorage.getItem(apiconfig.LS.TOKEN);
    let option = {
      url: apiconfig.BASE_URL + apiconfig.ENDPOINTS.ACCESS,
      method: "post",
      headers: {
        Authorization: token,
        "Content-Type": "application/json"
      },
      data: this.state.formdata
    };
    axios(option)
      .then(response => {
        if (response.data.code === 200) {
          alert("Success");
          this.props.history.push("/accessmenu");
        } else {
          alert(response.data.message);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  getListAccess() {
    let token = localStorage.getItem(apiconfig.LS.TOKEN);
    let option = {
      url: apiconfig.BASE_URL + apiconfig.ENDPOINTS.ACCESS,
      method: "get",
      headers: {
        Authorization: token //harus sama authorization  nya
      }
    };
    axios(option)
      .then(response => {
        this.setState({
          access: response.data.message,
          hasil: response.data.message
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getListAccess();
  }

  deleteHandler(param) {
    let token = localStorage.getItem(apiconfig.LS.TOKEN);
    let option = {
      url: apiconfig.BASE_URL + apiconfig.ENDPOINTS.ACCESS + "/" + param,
      method: "delete",
      headers: {
        Authorization: token
      }
    };
    axios(option)
      .then(response => {
        let currentindex = -1;
        this.state.access.map((ele, idx) => {
          if (ele._id == param) {
            currentindex = idx;
            this.props.history.goBack();
          }
        });
        let tmp = this.state.access;
        tmp.splice(currentindex, 1);
        this.setState({
          access: tmp
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  modalStatus(status, message, code) {
    this.setState({
      alertData: {
        status: status,
        message: message,
        code: code
      },
      viewAccess: false,
      editAccess: false,
      deleteAccess: false
    });
    // this.getListUnit();
  }

  render() {
    const { classes } = this.props;
    const { rows, rowsPerPage, page } = this.state;
    //const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    return (
      <div className={classes.root}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <ul class="breadcrumb">
                <li>
                  <a href="/dashboard">Home</a> <span class="divider">/</span>
                </li>
                <li>
                  <a href="#">Master</a> <span class="divider">/</span>
                </li>
                <li class="active">List Access</li>
              </ul>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <h4>List Access</h4>
          </Grid>
          <Grid item xs={6} justify="flex-end">
            <Input
              placeholder="Search"
              className={classes.input}
              name="search"
              onChange={this.changeHandler}
            />
            <Button
              variant="contained"
              className={classes.button}
              onClick={this.SearchHandler}
            >
              Search
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="small"
              className={classes.button}
              onClick={this.showHandler}
            >
              Add Access
            </Button>
          </Grid>
          <Grid item xs={6}>
            {this.state.alertData.status == 1 ? (
              <Alert color="success">
                <b>Data {this.state.alertData.message}</b> Data access with
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
          <CreateAccess
            create={this.state.showCreateAccess}
            closeHandler={this.closeHandler}
          />
          <ViewAccess
            view={this.state.viewAccess}
            closeModalHandler={this.closeModalHandler}
            access={this.state.currentAccess}
          />
          <DeleteAccess
            delete={this.state.deleteAccess}
            access={this.state.currentAccess}
            closeModalHandler={this.closeModalHandler}
            modalStatus={this.modalStatus}
          />
          <EditAccess
            edit={this.state.editAccess}
            closeModalHandler={this.closeModalHandler}
            accesstest={this.state.currentAccess}
            modalStatus={this.modalStatus}
          />
          <Grid item xs={12}>
            <Hidden>
              <Paper>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Role Code</TableCell>
                      <TableCell>Name Role</TableCell>
                      <TableCell>Menu Code</TableCell>
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
                      .map((row) => {
                        return (
                          <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                              {row.m_role_id}
                            </TableCell>
                            <TableCell>{row.m_role_name}</TableCell>
                            <TableCell>{row.m_menu_id}</TableCell>
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

ListAccess.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ListAccess);
