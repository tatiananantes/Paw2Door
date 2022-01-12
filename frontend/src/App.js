import './App.css';

import React, { Component } from "react";
import Modal from "./components/Modal";

const shelterItems = [
  {
    "id": 1,
    "name": "Shelter",
    "email": "shelter@mail.com",
    "password": "password",
    "phone_number": "12345678"
  },
  {
    "id": 2,
    "name": "Peterborough Animal Shelter",
    "email": "pas@example.com",
    "password": "saveanimals123",
    "phone_number": "01733 000000"
  }
]

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shelterList: shelterItems,
      modal: false,
      activeItem: {
        name: "",
        email: "",
        password: "",
        phone_number: "",
      },
    };
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = (item) => {
    this.toggle();

    alert("save" + JSON.stringify(item));
  };

  createItem = () => {
    const item = { name: "", email: "", password: "", phone_number: "" };

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
        <span>
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
        </span>
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
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}









export default App;
