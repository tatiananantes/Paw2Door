import React, {useEffect, useState } from "react";
import '../App.css';
import PetShelterDetails from './PetShelterDetails'

const PetDetails = () => {
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
      <div className='row'>
        {pets.map((pet, index) => {
          if (String(pet.id) == String(window.location.href.match(/\/([^\/]+)\/?$/)[1])) {
          return (
          <div className='pet col-sm-4' key={pet.id}>
            <div className='object-wrap'>
              {pet.image == null 
                ? <img src='http://localhost:8000/images/paw.png' className="img-fluid"></img>
                : <img src={pet.image} className="img-fluid img-sizer"></img>
              } 
               <p> {PetShelterDetails(pet.shelter)} </p>
            </div>
            <p className='name'>{pet.name}</p>
           
          </div>
        )}}
        )}
      </div>
    </div>
  
  )

};

export default PetDetails;