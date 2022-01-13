import React, { useEffect, useState } from "react";
import '../App.css';

const ShowPets = () => {
  const [pets, setData] = useState([]);

  useEffect(() => {
    const url = "http://localhost:8000/api/pet/";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='all_pets'>
      {pets.map((pet, index) => (
        <div className='pet' key={pet.id}>
          <p className='name'>{pet.name}</p>
          <br></br>
        </div>
      ))}
    </div>
  )
};

export default ShowPets;