import React, { Component } from "react";
import '../App.css';
import SignUpFormModal from "./SignUpFormModal";
import axios from "axios";
import { login } from "../actions/auth";

class SignUpForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      shelterList: [],
      modal: false,
      activeItem: {
        name: "",
        email: "",
        password: "",
        re_password: "",
        phone_number: "",
        postcode: "",
        longitude: 0.0,
        latitude: 0.0,
      },
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("/api/shelter/find/")
      .then((res) => this.setState({ shelterList: res.data }))
      .catch((err) => console.log(err));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  getLocation = async (item) => {

    this.toggle();

    await axios
    .get(`http://api.postcodes.io/postcodes/${item.postcode}`)
    .then((res) => {
      item['longitude'] = res.data.result.longitude
      item['latitude'] = res.data.result.latitude
    })

    this.handleSubmit(item)

  }

  handleSubmit = (item) => {

    if (item.id) {
      axios
        .put(`/auth/users/${item.id}/`, item)
        .then((res) => this.refreshList());
      return;
    }
    axios
      .post("/auth/users/", item)
      .then((res) => this.refreshList());

    login(this.state.email, this.state.password)
  };

  createItem = () => {
    const item = { name: "", email: "", password: "", re_password: "", phone_number: "", postcode: "", longitude: 0.0, latitude: 0.0 };

    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  renderItems = () => {
    const newItems = this.state.shelterList;

    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className= "mr-2"
          title={item.name}
        >
          {item.name}
        </span>
        {/* <span>
          <button
            className="btn btn-secondary mr-2"
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
          >
            Delete
          </button>
        </span> */}
      </li>
    ));
  };

  render() {
    return (
      <main className="container">
        <h1 className="text-white text-uppercase text-center my-4">Paw2Door App</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="mb-4">
                <button
                  className="btn btn-primary" 
                  onClick={this.createItem}
                >
                  Add Shelter
                </button>
              </div>
              <ul className="list-group list-group-flush border-top-0">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <SignUpFormModal
            role="dialog"
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.getLocation}
          />
        ) : null}
      </main>
    );
  }
}

export default SignUpForm;
