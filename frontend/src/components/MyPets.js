import React, { Component } from "react";
import { Link } from 'react-router-dom';
import '../App.css';
import axios from "axios";
import DisplayPetModal from "./DisplayPetModal";

export default class MyPets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myPetList: [],
      modal: false,
      id: "1",
    };
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

  toggle = () => {
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
          <Link to={"/pet/" + item.id} className="block mt-4 col-sm-4" key={item.id}>
            <div className='name'>
              <div className='pet'>
                <div className='object-wrap'>
                  {item.image == null 
                  ? <img src='http://localhost:8000/images/paw.png' className="img-fluid"></img>
                  : <img src={item.image} className="img-fluid img-sizer"></img>
                  }
                </div>
                <p className='name'>{item.name}</p>
                {localStorage.getItem('userId') == String(window.location.href.match(/\/([^\/]+)\/?$/)[1]) &&
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => this.deletePet(item.id)}
                  >
                    {'Remove ' + item.name}
                  </button>
                }
              </div>
            </div>
        </Link>
        )
      } 
    });
  };

  render() {
    return (
      <section>
        <div className='all-pets'>
          <div className='row'>
          {this.renderItems()}
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
