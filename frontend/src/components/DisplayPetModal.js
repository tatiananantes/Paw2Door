import React, { Component } from "react";
import axios from "axios";
import {
  Modal,
  ModalBody,
} from "reactstrap";

export default class DisplayPetModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      activePet: {
        id: "",
        name: "",
        image: "",
        age: "",
        species: "",
        gender: "",
        bio: "",
        shelter: "",
      },
    };
  }

  componentDidMount() {
    this.returnActivePet();
  }

  returnActivePet = () => {
    axios
      .get(`/api/pet/${this.state.id}`)
      .then((res) => this.setState({ activePet: res.data }))
      .catch((err) => console.log(err));
  };

  handleChange = (e) => {
    let { pet, value } = e.target;

    const activePet = {...this.state.activePet, [pet]: value};
    this.setState({ activePet })
  };

  render() {
    const { toggle } = this.props;
    const pet = this.state.activePet;
    return (
      <Modal isOpen={true} toggle={toggle} size="lg">
        <ModalBody>
          <section className="pet-profile mt-4">
            <div className='pet row' key={pet.id}>
              <div className="col-sm-6">
                <div className='object-wrap'>
                  {pet.image == null 
                    ? <img src='http://localhost:8000/images/paw.png' className="img-fluid"></img>
                    : <img src={pet.image} className="img-fluid img-sizer"></img>
                  } 
                </div>
              </div>
              <div className="col-sm-6">
                <h2 className='name'>{pet.name}</h2>
                <p>Age: {pet.age}</p>
                <p>Sex: {pet.gender}</p>
                <h4 className="h5">About</h4>
                <p>{pet.bio}</p>
              </div>
            </div>
          </section>
        </ModalBody>
      </Modal>
    );
  }

}