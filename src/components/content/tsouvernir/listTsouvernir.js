import React from "react";
import { Link } from "react-router-dom";
import { Alert,  FormGroup, Input, Form, Button } from "reactstrap";
import { getAllTsouvernir } from "../../../actions/tsouvernirAction";
import apiconfig from '../../../configs/api.config.json'
import axios from "axios"
import { connect } from "react-redux";
import EditTsouvenir from "./editTsouvernier";
import CreateTsouvenir from "./CreateTsouvernir";
import ViewTsouvenir from "./viewTsouvernir";
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
import SearchIcon from "@material-ui/icons/Search";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import Grid from "@material-ui/core/Grid";
import moment from "moment";

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

class ListTsouvenir extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialSearch:{
				code : /(?:)/,
				received_by : /(?:)/,
        received_date : /(?:)/,
        created_date :  /(?:)/,
				created_by : /(?:)/
			},
      search: "",
      showCreateTsouvenir: false,
      getitem : "",
      result: [],
      currentTsouvenir: {},
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
    this.state.result.map(ele => {
      if (companyid == ele._id) {
        tmp = ele;
      }
    });
    this.setState({
      currentTsouvenir: tmp
    });
  }

  chanegeDate = tanggal => {
    return moment(tanggal).format("DD/MM/YYYY")
  }

  viewModalHandler(companyid) {
    let tmp = {};
    this.state.result.map(ele => {
      if (companyid == ele._id) {
        tmp = ele;
      }
    });
    this.setState({
      currentTsouvenir: tmp,
      viewTsouvenir: true
    });
  }

  editModalHandler(dataItem, tsouvenirId) {
    const getOldFile = (code) =>  {
      let token = localStorage.getItem(apiconfig.LS.TOKEN);
      let option = {
        url: apiconfig.BASE_URL + apiconfig.ENDPOINTS.SOUV + '/' + code,
        method: "get",
        headers: {
          Authorization: token
        }
      };
      axios(option)
        .then(response => {
          this.setState({
            getitem: response.data.message
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
    getOldFile(dataItem);
    //console.log("ini lala",lala)
    localStorage.setItem("Code T SOUVENIR", JSON.stringify(dataItem))
    let tmp = {};
    this.state.result.map(ele => {
      if (tsouvenirId== ele._id) {
        tmp = {
          _id: ele._id,
          code: ele.code,
          received_by: ele.received_by,
          received_date: ele.received_date,
          note: ele.note,
          update_by: ele.update_by
        };
        this.setState({
          getitem : this.state.getitem,
          currentTsouvenir: tmp,
          EditTsouvenir: true
        });
      }
    });
  }

  changeHandler = event => {
    let tmp = this.state.initialSearch;
      if (event.target.name) {
        tmp[event.target.name] = new RegExp(event.target.value.toLowerCase());
      } else {
      tmp[event.target.name] = event.target.value;
      } 
      this.setState({
       formSearch: tmp
      });
      this.change();
  };

    change = () => {
      const {
        code,
        received_by,
        created_by,
        created_date
      } = this.state.initialSearch;
      let temp = [];
      this.state.result.map(ele => {
      if (
        code.test(ele.code.toLowerCase()) &&
        received_by.test(ele.received_by.toLowerCase()) &&
        created_by.test(ele.created_by.toLowerCase()) &&
        created_date.test(ele.created_date.toLowerCase())
      ) {
        temp.push(ele);
      }
      return temp;
    });
    this.setState({
      hasil: temp
    });
  };


  // changeHandler(e) {
  //   let test = [];
  //   let search = e.target.value;
  //   let patt = new RegExp(search.toLowerCase());

  //   this.state.result.map(ele => {
  //     if (
  //       patt.test(ele.code.toLowerCase()) ||
  //       patt.test(ele.received_by.toLowerCase()) ||
  //       patt.test(ele.created_date.toLowerCase())


  //     ) {
  //       test.push(ele);
  //     }
  //   });
  //   this.setState({
  //     hasil: test
  //   });
  // }

  closeModalHandler() {
    this.setState({
      viewTsouvenir: false,
      EditTsouvenir: false
    });
    this.props.getAllTsouvernir();
  }

  showHandler() {
    this.setState({ showCreateTsouvenir: true });
  }

  closeHandler() {
    this.setState({ showCreateTsouvenir: false });
  }

  componentDidMount() {
    this.props.getAllTsouvernir();
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      result: newProps.tsouvernir.ts,
      hasil: newProps.tsouvernir.ts
    });
  }

  modalStatus(status, message, code) {
    this.setState({
      alertData: {
        status: status,
        message: message,
        code: code
      },
      viewTsouvenir: false,
      EditTsouvenir: false
    });
    // this.getListUnit();
  }

  render() {
    const { classes } = this.props;
    // const { rows, rowsPerPage, page } = this.state;
    //const { company } = this.props.bujang;

    //alert(JSON.stringify(this.state.companis))
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
            <h4>List Souvernir Stock</h4>
          </Grid>
          <Form inline>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Input type="text"  placeholder="Search Code" name="code" onChange={this.changeHandler} />
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Input type="text"  placeholder="Search Received By" name="received_by" onChange={this.changeHandler} />
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Input type="text"  placeholder="Search Created By" name="created_by" onChange={this.changeHandler} />
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Input type="date"  placeholder="Search Created Date" name="created_date" onChange={this.changeHandler} />
            </FormGroup >
            <Button variant="contained" color="primary" size="small" onClick={this.showHandler}>
              Add Stock
            </Button>
          </Form>
          <Grid item xs={3} justify="flex-end"> 
          </Grid>
          <ViewTsouvenir
            view={this.state.viewTsouvenir}
            closeModalHandler={this.closeModalHandler}
            item={this.state.currentTsouvenir}
            
          />
         <CreateTsouvenir
            create={this.state.showCreateTsouvenir}
            closeHandler={this.closeHandler}
            modalStatus={this.modalStatus}
            closeModalHandler={this.closeModalHandler}
          />
           <EditTsouvenir
            edit={this.state.EditTsouvenir}
            closeModalHandler={this.closeModalHandler}
            tsouvenirTest={this.state.currentTsouvenir}
            getAllItem = {this.state.getitem}
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
                      <TableCell>Souvernir Code</TableCell>
                      <TableCell>Received By</TableCell>
                      <TableCell>Received Date</TableCell>
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
                            <TableCell>{row.received_by}</TableCell>
                            <TableCell>{this.chanegeDate(row.received_date)}</TableCell>
                            <TableCell>{row.created_by}</TableCell>
                            <TableCell>{this.chanegeDate(row.created_date)}</TableCell>
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
                                    this.editModalHandler(row.code, row._id);
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
        <br />
        <Grid item xs={12}>
            {this.state.alertData.status == 1 ? (
              <Alert color="success">
                <b>Data {this.state.alertData.message}</b> Data Souvenir with
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
      </div>
    );
  }
}

ListTsouvenir.propTypes = {
  getAllTsouvernir: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  tsouvernir: state.tsouvernir
});

export default connect(
  mapStateToProps,
  { getAllTsouvernir }
)(ListTsouvenir);
