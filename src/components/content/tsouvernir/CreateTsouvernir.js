import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Col, Row, Form, FormGroup, Label, Input,  Button, FormFeedback } from 'reactstrap';
import { Alert , Table} from "reactstrap";
import PropTypes from "prop-types";
import apiconfig from "../../../configs/api.config.json";
import { connect } from "react-redux";
import { createTsouveniritem } from "../../../actions/tsouvenirItemTable";
import {getAllTsouvernirItem} from "../../../actions/tsouveniItemAction"
import { getAllEmployee} from "../../../actions/employeeAction"
import Select from 'react-select'
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import { Link } from "react-router-dom";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import moment from 'moment'

//import Button from '@material-ui/core/Button';
class CreateTsouvenir extends React.Component {
  constructor(props) {
    super(props);
    let userdata = JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA));
    this.state = {
      code: "",
      received_by: "",
      received_date: "",
      note: "",
      item: [],
      created_by: userdata.username,
      alertData: {
        status: false,
        message: ""
      },
      labelWidth: 0,
      selectedOption: "",
      selectedOption2: "",
      employee: [],
      sov: [],
      invalid : false
      
    };

    this.submitHandler = this.submitHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler(e) {
    if(e.target.name =='received_date' && moment(e.target.value) < moment().subtract(1,"day")){
      this.setState({
        invalid : true
      })
    } else {
      this.setState({
        invalid : false
      })
    }
    this.setState({
      [e.target.name] : e.target.value,
      alertData: {
        status: false,
        message: ""
      }
    });
  }

  
  
  handleShareholderItemChange = (idx) => (evt) => {
    const newShareholders = this.state.item.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, [evt.target.name]: evt.target.value };
    });

    this.setState({ item: newShareholders });
  }

  handleSubmit = (evt) => {
    const { item, shareholders } = this.state;
    alert(`Incorporated: ${item} with ${shareholders.length} shareholders`);
  }

  handleAddItem = () => {
    let userdata = JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA));
    this.setState({
      item: this.state.item.concat([{ 
        m_souvenir_id: '',
        qty:'', 
        note:'' ,
        created_by: userdata.username,
        disable : true,
        readOnly : true
      }])
    });
  }

  handleRemoveItem = (idx) => () => {
    this.setState({
      item: this.state.item.filter((s, sidx) => idx !== sidx)
    });
  }

  handleEditItem = (idx) => () => {
    const newShareholders = this.state.item.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, disable : false, readOnly : false };
    });

    this.setState({ item: newShareholders });
  }

  handleChange1 = (selectedOption) => {
    this.setState({
        selectedOption,
        received_by:selectedOption.value
    });
  };

  handleChange2 = (selectedOption2) => {
    this.setState({
        selectedOption2,
        shareholder:selectedOption2.value
    });
  };

  componentDidMount() {
    this.props.getAllTsouvernirItem();
    this.props.getAllEmployee();
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      sov: newProps.tsouverniritem.tsI,
      employee:newProps.employeeid.employee
    });
  }
  submitHandler() {
    const formdata = {
      code: this.state.code,
      received_by: this.state.received_by,
      received_date: this.state.received_date,
      note:this.state.note,
      created_by: this.state.created_by,
    }

    let dataItem = this.state.item.map((content, index) => {
      return {
        m_souvenir_id: content.m_souvenir_id,
        qty: parseInt(content.qty),
        note: content.note,
        created_by: content.created_by,
        created_date: content.created_date,
        is_delete: false
      }
    })

    if (formdata.received_by === "") {
      this.setState({
        alertData: {
          status: true,
          message: "Received By form must be filled!"
        }
      });
    } else if (formdata.received_date === "") {
      this.setState({
        alertData: {
          status: true,
          message: "Received date form must be filled!"
        }
      });
    } else if (this.state.item.m_souvenir_id === "") {
      this.setState({
        alertData: {
          status: true,
          message: "Souvenir item form must be filled!"
        }
      });
    } else if (this.state.item.qty === "") {
      this.setState({
        alertData: {
          status: true,
          message: "Souvenir qty form must be filled!"
        }
      });
    }
    else if(moment(this.state.received_date) < moment().subtract(1,"day")){
      alert("Pilih Tnaggal Baru")
    } 
    else {
      {this.state.item.forEach((row) => {
        if(row.m_souvenir_id === ""){
          this.setState({
            alertData: {
              status: true,
              message: "Souvenir Item form must be filled!"
            }
          });
        }
        else if (row.qty === ""){
          this.setState({
            alertData: {
              status: true,
              message: "Qty form must be filled!"
            }
          });
        }
        else{
           //alert(JSON.stringify(this.state.shareholders))
          const datas = [formdata, dataItem]
          this.props.createTsouveniritem(datas)
          this.props.modalStatus(1, "Created!", formdata.code)
          this.props.closeHandler();
        }
      })}
    }
  }


  render() {
    //alert(JSON.stringify(this.state.shareholder))
    //alert(JSON.stringify(this.state.sov))

      const options1 = []
          this.state.employee.map( row => {
           options1.push({
             value:row.first_name + " " + row.last_name ,
             label:row.first_name + " " + row.last_name
          })
      })

      const options2 = []
      this.state.sov.map( row => {
       options2.push({
         value:row.code ,
         label:row.name
      })
    })
    
    const { classes } = this.props;
    return (
      <Modal isOpen={this.props.create} className={this.props.className}>
        <ModalHeader> Add Souvernir</ModalHeader>
        <ModalBody>
            <FormGroup>
              <Label for="">Code</Label>
              <Input type="text" name="code"  placeholder="Auto Generate" readOnly />
            </FormGroup>
            <formControl variant="outlined" 
            >
              <Label for="">Received By</Label>
              <Select
                value={this.state.selectedOption}
                onChange={this.handleChange1}
                options={options1}
              />
            </formControl>
            <FormGroup>
              <Label for="">Received date</Label>
              <Input type="date" name="received_date"  placeholder="" value={this.state.received_date}  onChange={this.changeHandler} invalid = {this.state.invalid} />
              <FormFeedback invalid = {this.state.invalid}>Oh noes! that date is already taken</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="">Note</Label>
              <Input type="textarea" name="note"  placeholder="" value={this.state.note}  onChange={this.changeHandler} />
            </FormGroup>
            <Button variant="contained" color="primary" size="small" onClick={this.handleAddItem}>
              Add Item
            </Button>
            <br />
            <Row>
              <Col md={5}><Label><b>Souvenir Item</b></Label></Col>
              <Col md={2}><Label><b>Qty</b></Label></Col>
              <Col md={2}><Label><b>Note</b></Label></Col>
            </Row>
            {this.state.item.map((shareholder, idx) => (
              <div className="shareholder">
                <Row form>
                  <Col md={5}>
                    <FormGroup>
                      <select name="m_souvenir_id" id="m_souvenir_id" class="form-control"
                        value={shareholder.m_souvenir_id} onChange={this.handleShareholderItemChange(idx)} disabled = {shareholder.disable}>
                        {this.state.sov.map(row => <option value={row.code}>{row.name}</option>)}
                        <option value="" disabled>
                          {" "}-{" "}
                        </option>
                      </select>
                    </FormGroup>
                  </Col>
                  <Col md={2}>
                    <FormGroup>
                    <Input type="text" name="qty" id="exampleQty"onChange={this.handleShareholderItemChange(idx)} value={shareholder.qty} readOnly = {shareholder.readOnly} />
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                    <Input type="text" name="note" id="exampleNote" onChange={this.handleShareholderItemChange(idx)} readOnly = {shareholder.readOnly}/>
                    </FormGroup>
                  </Col>
                  <Col md={1}>
                      <CreateOutlinedIcon onClick = {this.handleEditItem(idx)} size="small" />
                  </Col>
                  <Col md={1}>
                    <DeleteOutlinedIcon onClick={this.handleRemoveItem(idx)} size="small" />
                  </Col>
                </Row>
              </div>
            ))}
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
          <Button color="warning" variant="contained" onClick={this.props.closeHandler}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

CreateTsouvenir.propTypes = {
  createTsouveniritem: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    createTsouvernir: PropTypes.func.isRequired,
    tsouverniritem : PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    tsouverniritem : state. tsouverniritem,
    employeeid : state.employeeid
  });
  
  export default connect(
    mapStateToProps,
    { 
    createTsouveniritem,
    getAllTsouvernirItem,
    getAllEmployee
   }
  )(CreateTsouvenir);