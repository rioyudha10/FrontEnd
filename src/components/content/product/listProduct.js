import React from "react";
import API from "../../../helpers/API"
import apiconfig from '../../../configs/api.config.json'
import axios from "axios";
import { Link } from "react-router-dom";
import { Alert, FormGroup, Input, Form, Button } from "reactstrap";
import $ from "jquery";
import { getAllProduct } from "../../../actions/productAction";
import { connect } from "react-redux";

import EditProduct from "./editProduct";
import CreateProduct from "./createProduct";
import DeleteProduct from "./deleteProduct";
import ViewProduct from "./viewProduct";

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
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import Grid from "@material-ui/core/Grid";
import moment from "moment";

const gridstyles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

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

class ListProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteProduct : false,
      initialSearch:{
				code : /(?:)/,
				name : /(?:)/,
        description : /(?:)/,
        created_date :  /(?:)/,
				created_by : /(?:)/
			},
      search: "",
      showCreateProduct: false,
      result: [],
      currentProduct: {},
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
      currentProduct: tmp,
      deleteProduct: true
    });
    console.log("alert", this.state.deleteProduct)
  }

  viewModalHandler(companyid) {
    let tmp = {};
    this.state.result.map(ele => {
      if (companyid == ele._id) {
        tmp = ele;
      }
    });
    this.setState({
      currentProduct: tmp,
      viewProduct: true
    });
  }

  chanegeDate = tanggal => {
    return moment(tanggal).format("DD/MM/YYYY")
  }

  editModalHandler(companyid) {
    let tmp = {};
    this.state.result.map(ele => {
      if (companyid == ele._id) {
        tmp = {
          _id: ele._id,
          code: ele.code,
          name: ele.name,
          description:ele.description,
          update_by: JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA)),
          address: ele.address,
        };
        //alert(JSON.stringify(tmp));
        this.setState({
          currentProduct: tmp,
          editProduct: true
        });
      }
    });
  }

  changeHandler = event => {
    //alert(event.target.name)
    //alert(event.target.value)
    let tmp = this.state.initialSearch;
      if (event.target.name) {
        tmp[event.target.name] = new RegExp(event.target.value);
        // alert(tmp["created_date"])
      } else {
      tmp[event.target.name] = event.target.value;
      } 
      this.setState({
        initialSearch: tmp
      });
      this.change();

  };

    change = () => {
      const {
        code,
        name,
        description,
        created_by,
        created_date
      } = this.state.initialSearch;
      let temp = [];
      this.state.result.map(ele => {
      if (
        (code.test(ele.code.toLowerCase()) || code.test("")) &&
        (name.test(ele.name.toLowerCase()) || name.test("")) &&
        (description.test(ele.description.toLowerCase()) || description.test("")) &&
        (created_by.test(ele.created_by.toLowerCase()) || created_by.test("")) &&
        (created_date.test(ele.created_date.toLowerCase()) || created_date.test(""))
      ) {
        temp.push(ele);
      }
      //alert(JSON.stringify(temp))
      return temp;
    });
    this.setState({
      hasil: temp
    });
  };

  // changeHandler(e){
  //   let test = [];
  //   let search = e.target.value;
  //   let patt = new RegExp(search.toLowerCase());

  //   this.state.result.map(ele => {
  //     if (
  //       patt.test(ele.code.toLowerCase()) ||
  //       patt.test(ele.name.toLowerCase())||
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
      viewProduct: false,
      editProduct: false,
      deleteProduct: false
    });
  }

  showHandler() {
    this.setState({ showCreateProduct: true });
  }

  closeHandler() {
    this.setState({ showCreateProduct: false });
  }

  componentDidMount() {
    this.props.getAllProduct();
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      result: newProps.product.production,
      hasil: newProps.product.production
    });
  }

  // func(arrReq){
  //   return arrReq
  // }

  modalStatus(status, message, code) {
    this.setState({
      alertData: {
        status: status,
        message: message,
        code: code
      },
      viewProduct: false,
      editProduct: false,
      deleteProduct: false
    });
    this.props.getAllProduct()
    // this.getListUnit();
  }

  render() {
    //
    const { classes } = this.props;
    const regex = /[A-Z]+/g;
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
                <li class="active">List Product</li>
              </ul>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <h4>List Product</h4>
          </Grid>
          
           <Form inline>
           <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Input type="text"  placeholder="Search Code" name="code" onChange={this.changeHandler} />
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Input type="text"  placeholder="Search Product Name" name="name" onChange={this.changeHandler} />
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Input type="text"  placeholder="Search Description" name="description" onChange={this.changeHandler} />
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Input type="text"  placeholder="Search Created By" name="created_by" onChange={this.changeHandler} />
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Input type="date"  placeholder="Search Created Date" name="created_date" onChange={this.changeHandler} />
            </FormGroup >
            <Button variant="contained" color="primary" size="small" onClick={this.showHandler}>
              Add
            </Button>
          </Form>
          <DeleteProduct
            delete={this.state.deleteProduct}
            product_del={this.state.currentProduct}
            closeModalHandler={this.closeModalHandler}
            modalStatus={this.modalStatus}
          />
          <ViewProduct
            view={this.state.viewProduct}
            closeModalHandler={this.closeModalHandler}
            product={this.state.currentProduct}
          />
         <CreateProduct
            create={this.state.showCreateProduct}
            closeHandler={this.closeHandler}
            getAllProduct = {this.props.getAllProduct}
            modalStatus={this.modalStatus}
            dataValidation = {(this.state.hasil.map(content=>content.name))}
          />
           <EditProduct
            edit={this.state.editProduct}
            closeModalHandler={this.closeModalHandler}
            product_test={this.state.currentProduct}
            getAllProduct = {this.props.getAllProduct}
            modalStatus={this.modalStatus}
            dataValidation = {(this.state.hasil.map(content=>content.name))}
          />
          <Grid item xs={12}>
            <Hidden>
              <br />
              <Paper>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>No</TableCell>
                      <TableCell>Product Code</TableCell>
                      <TableCell>Product Name</TableCell>
                      <TableCell>Description</TableCell>
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
                            <TableCell>{row.description}</TableCell>
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
        <br />
          <Grid>
            {this.state.alertData.status == 1 ? (
              <Alert color="success">
                <b>Data {this.state.alertData.message}</b> Data Product with
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


ListProduct.propTypes = {
  getAllProduct: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  product: state.product
});

export default connect(
  mapStateToProps,
  { getAllProduct }
)(ListProduct);
