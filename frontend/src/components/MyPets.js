import React, { Component } from "react";
import '../App.css';
import axios from "axios";
import DisplayPetModal from "./DisplayPetModal";

export default class MyPets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myPetList: [],
      modal: false,
      id: "",
    };
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    this.refreshList();
  }

  deletePet = pk => {
    axios.delete("/api/pet/" + pk).then(() => {
      this.refreshList()
    });
  };

  refreshList = () => {
    axios
      .get("/api/pet/")
      .then((res) => this.setState({ myPetList: res.data }))
      .catch((err) => console.log(err));
  };

  toggle = pet => {
    this.setState({ id: pet })
    this.setState({ modal: !this.state.modal });
  };

  createItem = () => {
    this.setState({ id: this.state.id, modal: !this.state.modal });
  };


  renderItems = () => {
    const newItems = this.state.myPetList;

    return newItems.map((item) => {
      if (String(item.shelter) == String(window.location.href.match(/\/([^\/]+)\/?$/)[1])) {
        return (
          <div className='name block mt-4 col-sm-4' key={item.id}>
            <button className="btn-blank" onClick={() => this.toggle(item.id)}>
              <div className='pet'>
                <div className='object-wrap'>
                  {item.image == null 
                  ? <img src='http://localhost:8000/images/paw.png' className="img-fluid"></img>
                  : <img src={item.image} className="img-fluid img-sizer"></img>
                  }
                </div>
                <div className="text-wrap">
                  <p className='name'><strong>{item.name}</strong></p>
                </div>
              </div>
            </button>
            {localStorage.getItem('userId') == String(window.location.href.match(/\/([^\/]+)\/?$/)[1]) &&
                <div className="text-center mt-2 mb-2">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => this.deletePet(item.id)}
                  >
                    Delete
                  </button>
                </div>
              }
          </div>
        )
      } 
    });
  };

  render() {
    return (
      <section>
        <div className='all-pets pb-5'>
          <div className="container">
            <div className='row'>
              {this.renderItems()}
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <DisplayPetModal
            id={this.state.id}
            toggle={this.toggle}
          />
        ) : null}
      </section>

    );
  }

};