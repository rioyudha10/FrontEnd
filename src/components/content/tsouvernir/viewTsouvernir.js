import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button, Input, Label, FormGroup, Table } from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getListItem } from "../../../actions/tsouvenirItemTable";


const styles = theme => ({
  root: {
    width: "100%",
    flexGrow: 1
  },
  table: {
    minWidth: 700
  }
});



class ViewTsouvenir extends React.Component {
  constructor ( props) {
    super(props)
    this.state = {
      item : []
    }
  }

  componentDidMount() {
    this.props.getListItem()
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      item: newProps.itemTable.it
    });
  }

  func(input){
    return input.map(a=>{
      if(a.t_souvenir_id == this.props.item.code){
        return a;
      }
    }).filter(b=>b!==undefined)
  }
  

  render() {
    //alert(JSON.stringify(this.props))
    const { classes } = this.props;
    return (
      <Modal isOpen={this.props.view} className={this.props.className}>
        <ModalHeader> View Souvenir Item</ModalHeader>
        <ModalBody>
          <div>
            <h3>{this.props.item.code} </h3>
          </div>
          <div>
            <FormGroup>
              <Label for="">Code</Label>
              <Input type="text" name="code"  placeholder="" value={this.props.item.code} readOnly />
            </FormGroup>
            <FormGroup>
              <Label for="">Received By</Label>
              <Input type="text" name="received_by"  placeholder="" value={this.props.item.received_by} readOnly />
            </FormGroup>
            <FormGroup>
              <Label for="" >Received Date</Label>
              <Input type="text" name="received_date"  placeholder="" value={this.props.item.received_date} readOnly />
            </FormGroup>
            <FormGroup>
              <Label for="">Note</Label>
              <Input type="text" name="note"  placeholder="" value={this.props.item.note}  readOnly />
            </FormGroup>
          </div>
          <div>
            <h3>Souvenir Item </h3>
          </div>
          <Table>
            <thead>
              <tr>
                <th>Souvenir Item</th>
                <th>Qty</th>
                <th>Note</th>
              </tr>
            </thead>
            <tbody>
              {this.func(this.state.item).map((ele)=>(
                <tr>
                  <td>
                    <Input type="text" name="note"  placeholder={ele.m_souvenir_id} value=""  readOnly/>
                  </td>
                  <td>
                    <Input type="text" name="note"  placeholder={ele.qty} value=""  readOnly/>
                  </td>
                  <td>
                    <Input type="text" name="note"  placeholder={ele.note} value=""  readOnly/>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
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

ViewTsouvenir.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  itemTable: state.itemTable
});

export default connect(
  mapStateToProps,
  { getListItem}
)(ViewTsouvenir);
