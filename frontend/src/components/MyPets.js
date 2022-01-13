import React, { Component } from "react";
import '../App.css';
import axios from "axios";

export default class MyPets extends Component {
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
        <div className='row'>
         {this.renderItems()}
        </div>
      </div>
    );
  }

};
