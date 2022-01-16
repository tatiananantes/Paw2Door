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
    <div className='all-pets'>
      <h1>Pets avaialble for adoption</h1>
      <div className='row'>
        {pets.map((pet, index) => (
          <div className='pet col-sm-4' key={pet.id}>
            <div className='object-wrap'>
              {pet.image == null 
                ? <img src='http://localhost:8000/images/paw.png' className="img-fluid"></img>
                : <img src={pet.image} className="img-fluid img-sizer"></img>
              }
            </div>
            <p className='name'>{pet.name}</p>
          </div>
        ))}
      </div>

    </div>
  )
};

export default ShowPets;