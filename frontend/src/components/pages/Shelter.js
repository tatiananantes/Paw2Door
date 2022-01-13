import React from 'react';
import '../../App.css';
import '../../App.js';
import ShelterDetails from '../ShelterDetails';
import MyPets from '../MyPets';
import AddPets from '../AddPets';

function Shelter() {
  return (
    <>
      <ShelterDetails />
      <AddPets />
      <MyPets />
    </>
  );
};

export default Shelter;
