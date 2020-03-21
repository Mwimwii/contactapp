import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";

export default class CustomModal extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      activeItem: this.props.activeItem
    };
  }
  
  handleChange = e => {
    let { name, value } = e.target;
    // e.target.type to check if the type is check box or not
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }
    const activeItem = { ...this.state.activeItem, [name]: value};
    this.setState({activeItem});
  };
  
  render() {
    const { toggle, onSave } = this.props;
    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}> Client</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={this.state.activeItem.name}
                  onChange={this.handleChange}
                  placeholder="Enter the company name"
                />
            </FormGroup>
            <FormGroup>
              <Label for="number">Number</Label>
                <Input
                  type="text"
                  name="number"
                  value={this.state.activeItem.number}
                  onChange={this.handleChange}
                  placeholder="Enter the company number"
                />
            </FormGroup>
            <FormGroup check>
              <Label for="isdone">
                <Input
                  type="checkbox"
                  name="isdone"
                  value={this.state.activeItem.isdone}
                  onChange={this.handleChange}
                  placeholder="Enter the company number"
                />
                Completed
              </Label>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => onSave(this.state.activeItem)}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
