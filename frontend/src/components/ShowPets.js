import React, { useEffect, useState } from "react";
import '../App.css';

const ShowPets = () => {
  const [pets, setData] = useState([]);

  const addPet = () => {
    const url = "http://localhost:8000/api/pet/";
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ name: 'mittens', shelter: '1' })
      };
      fetch(url, requestOptions)
        .then(response => response.json())
        .then(json => json.data)
    };
    
  addPet()

  return (
    <div className='all-pets'>


    </div>
  )
};

export default ShowPets;