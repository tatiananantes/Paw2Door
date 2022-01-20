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
      shelterList: [],
    };
  }

  componentDidMount() {
    this.returnActivePet();
    this.returnShelters();
  }

  returnActivePet = () => {
    axios
      .get(`/api/pet/${this.state.id}`)
      .then((res) => this.setState({ activePet: res.data }))
      .catch((err) => console.log(err));
  };

  returnShelters = () => {
    axios
      .get('/api/shelter/find/')
      .then((res) => this.setState({ shelterList: res.data }))
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
    const shelter = this.state.shelterList
    return (
      <Modal isOpen={true} toggle={toggle} size="lg">
        <ModalBody>
          <section className="pet-profile mt-4">
            <div className='pet row flex-row' key={pet.id}>
              <div className="col-sm-6">
                <div className='object-wrap'>
                  {pet.image == null 
                    ? <img src='http://localhost:8000/images/paw.png' className="img-fluid img-thumbnail"></img>
                    : <img src={pet.image} className="img-fluid img-sizer img-thumbnail"></img>
                  } 
                </div>
              </div>
              <div className="col-sm-6">
                <h1 className='name'>{pet.name}</h1>
                <p>Age: {pet.age}</p>
                <p>Sex: {pet.gender}</p>
                <h2>About</h2>
                <p>{pet.bio}</p>
              </div>
            </div>
            <hr></hr>
            <div className="row mt-4">
                {shelter.map((shelter) => {
                  if (shelter.id == pet.shelter) {
                    return (
                      <div className="col-sm-12 shelter-block">
                        <h3>Contact details</h3>
                        <div className='shelter' key={shelter.id}>
                          <p className='name'>Shelter: <a href={'/shelter/' + shelter.id}>{shelter.name}</a></p>
                          <p className='email'>Email: <a href={'mailto:' + shelter.email}>{ shelter.email}</a></p>
                          <p className='phone_number'>Phone Number: {shelter.phone_number}</p>
                        </div>
                      </div>
                    )}
                  }
                )}
            </div>
          </section>
        </ModalBody>
      </Modal>
    );
  }

}