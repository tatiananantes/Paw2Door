import axios from "axios";
import React, {useEffect, useState } from "react";
import '../App.css';

const PetDetails = () => {
  const [pets, setData] = useState([]);
  const [shelter, setShelter] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/pet/");
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.log("error", error);
      }
    };

    const fetchShelterDetails = async () => {
      await axios
        .get('http://localhost:8000/api/shelter/find/')
        .then((res) => {
          console.log(res.data)
          setShelter(res.data)
        })
        .catch((err) => console.log(err));
    }

    fetchShelterDetails()
    fetchData();

  }, []);

  return (
    <div className='all-pets'>
      <div className='row'>
        {pets.map((pet) => {
          if (String(pet.id) == String(window.location.href.match(/\/([^\/]+)\/?$/)[1])) {
          return (
          <div className='pet col-sm-4' key={pet.id}>
            <div className='object-wrap'>
              {pet.image == null 
                ? <img src='http://localhost:8000/images/paw.png' className="img-fluid"></img>
                : <img src={pet.image} className="img-fluid img-sizer"></img>
              } 
            </div>
            <p className='name'>{pet.name}</p>
            {shelter.map((shelter) => {
              if (shelter.id == pet.shelter) {
                return (
                  <div className='shelter col-sm-20' key={shelter.id}>
                    <p className='name'>Name: {shelter.name}</p>
                    <p className='email'>Email: { shelter.email}</p>
                    <p className='phone_number'>Phone Number: {shelter.phone_number}</p>
                  </div>
                )}
              }
          )}
           
          </div>
        )}}
        )}
      </div>
    </div>
  
  )

};

export default PetDetails;