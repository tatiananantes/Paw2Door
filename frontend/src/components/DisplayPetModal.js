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
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get(`/api/pet/${this.state.id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  handleChange = (e) => {
    let { pet, value } = e.target;

    const activeItem = {...this.state.activeItem, [pet]: value};
    this.setState({ activeItem })
  };

  render() {
    const { toggle } = this.props;
  
    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalBody>

        </ModalBody>
      </Modal>
    );
  }

}