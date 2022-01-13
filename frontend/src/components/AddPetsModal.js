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

export default class AddPetsModal extends Component {
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
        <ModalHeader toggle={toggle}>Add Animal to Shelter</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
            <Label for="shelter">Shelter</Label>
              <Input
                type="text"
                id="shelter"
                name="shelter"
                value={this.state.activeItem.shelter}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={this.state.activeItem.name}
                onChange={this.handleChange}
                placeholder="Enter the name of the animal"
              />
            </FormGroup>
            <FormGroup>
              <Label for="image">Image</Label>
              <Input
                type="file"
                id="image"
                name="image"
                value={this.state.activeItem.image}
                onChange={this.handleChange}
                placeholder="Please enter an image of the animal"
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