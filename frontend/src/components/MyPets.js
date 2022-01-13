import React, { Component } from "react";
import '../App.css';
import AddPetsModal from "./AddPetsModal";
import axios from "axios";

class MyPets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myPetList: [],
      modal: false,
      activeItem: {
        shelter: "",
        name: "",
        image: null,
      },
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("/api/pet/")
      .then((res) => this.setState({ myPetList: res.data }))
      .catch((err) => console.log(err));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = (item) => {
    this.toggle();

    if (item.id) {
      axios
        .put(`/api/pet/${item.id}/`, item)
        .then((res) => this.refreshList());
      return;
    }
    axios
      .post("/api/pet/", item)
      .then((res) => this.refreshList());
  };

  createItem = () => {
    const item = { shelter: "", name: "", image: null };

    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  renderItems = () => {
    const newItems = this.state.myPetList;

    return newItems.map((item) => (
      <div className='pet col-sm-4' key={item.id}>
        <div className='object-wrap'>
          {item.image == null 
            ? <img src='http://localhost:8000/images/paw.png' className="img-fluid"></img>
            : <img src={item.image} className="img-fluid img-sizer"></img>
          }
        </div>
        <p className='name'>{item.name}</p>
      </div>
    ));
  };

  render() {
    return (
      <div className='all-pets'>
        <button
          className="btn btn-primary" 
          onClick={this.createItem}
        >
          Add Pet
        </button>
        <div className='row'>
         {this.renderItems()}
        </div>
        {this.state.modal ? (
          <AddPetsModal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </div>
    );
  }

};

export default MyPets;