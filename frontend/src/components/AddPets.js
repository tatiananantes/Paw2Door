import React, { Component, Fragment } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import axios from "axios";
import MyPets from "./MyPets";

export default class AddPets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userParam: '',
      title: '',
      content: '',
      image: null,
      age: 0,
      gender: "Male",
      bio: "",
      species: "Dog",
      isModalOpen: false,
    };
  }

  addButton = () => (
    <Fragment>
        <button className="btn btn-primary mt-2 mb-4" onClick={this.toggle}>
          Add a pet
        </button>
    </Fragment>
  );

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleImageChange = (e) => {
    this.setState({
      image: e.target.files[0],
    });
  };

  toggle = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.toggle();
    console.log(this.state);
    let form_data = new FormData();
    form_data.append("image", this.state.image, this.state.image.name);
    form_data.append("name", this.state.name);
    form_data.append("shelter", `${localStorage.getItem("userId")}`);
    form_data.append("age", this.state.age);
    form_data.append("gender", this.state.gender);
    form_data.append("bio", this.state.bio);
    form_data.append("species", this.state.species);
    console.log(form_data);
    let url = "http://localhost:8000/api/pet/";

    axios
      .post(url, form_data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));

    window.location.reload()
  };

  render() {
    const { toggle, onSave } = this.props;
    if (localStorage.getItem("userId")) {
      return (
        <div>
          {localStorage.getItem('userId') == String(window.location.href.match(/\/([^\/]+)\/?$/)[1]) &&
            this.addButton()
          }
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggle}>
            <ModalHeader toggle={toggle}>Add Animal to Shelter</ModalHeader>
            <ModalBody>
              <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <Label for="name">Name</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                    placeholder="Enter the name of the animal"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="age">Age</Label>
                  <Input
                    type="number"
                    id="age"
                    name="age"
                    value={this.state.age}
                    onChange={this.handleChange}
                    placeholder="Enter the age of the animal"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="gender">Gender</Label>
                  <Input
                    type="select"
                    id="gender"
                    name="gender"
                    value={this.state.gender}
                    onChange={this.handleChange}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="species">Species</Label>
                  <Input
                    type="select"
                    id="species"
                    name="species"
                    value={this.state.species}
                    onChange={this.handleChange}
                  >
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="bio">Bio</Label>
                  <Input
                    type="textarea"
                    id="bio"
                    name="bio"
                    value={this.state.bio}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="image">Image</Label>
                  <Input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/png, image/jpeg"
                    onChange={this.handleImageChange}
                    placeholder="Please enter an image of the animal"
                  />
                </FormGroup>
                <Button color="success" type="submit">
                  Save
                </Button>
              </Form>
            </ModalBody>
          </Modal>
          <MyPets />
        </div>
      );
    } else {
      return <MyPets />;
    }
  }
}
