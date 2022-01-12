import React from 'react';
import '../../App.css';
import '../../App.js';
import ShelterDetails from '../ShelterDetails';
import MyPets from '../MyPets';
import AddPet from '../AddPet';

function Shelter() {
  return (
    <>
      <ShelterDetails />
      <MyPets />
      <AddPet />
    </>
  );
};

export default Shelter;
