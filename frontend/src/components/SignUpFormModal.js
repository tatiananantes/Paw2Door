import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;

    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }

    const activeItem = {...this.state.activeItem, [name]: value};

    this.setState({ activeItem })
  };

  render() {
    const { toggle, onSave } = this.props;
  
    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Create Shelter</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="shelter-name">Name</Label>
              <Input
                type="text"
                id="shelter-name"
                name="name"
                value={this.state.activeItem.name}
                onChange={this.handleChange}
                placeholder="Enter the shelter name"
              />
            </FormGroup>
            <FormGroup>
              <Label for="shelter-email">Email</Label>
              <Input
                type="email"
                id="shelter-email"
                name="email"
                value={this.state.activeItem.email}
                onChange={this.handleChange}
                placeholder="Enter email address"
              />
            </FormGroup>
            <FormGroup>
              <Label for="shelter-password">Password</Label>
              <Input
                type="text"
                id="shelter-password"
                name="password"
                value={this.state.activeItem.password}
                onChange={this.handleChange}
                placeholder="Please enter a password"
              />
            </FormGroup>
            <FormGroup>
              <Label for="shelter-phone_number">Phone Number</Label>
              <Input
                type="text"
                id="shelter-phone_number"
                name="phone_number"
                value={this.state.activeItem.phone_number}
                onChange={this.handleChange}
                placeholder="Please enter the phone number"
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => onSave(this.state.activeItem)}
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }

}