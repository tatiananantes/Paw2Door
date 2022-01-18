import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import '../App.css';
import axios from "axios";
const sortByDistance = require('sort-by-distance')

const ShowPets = () => {
  const [pets, setData] = useState([]);
  const [shelters, setShelter] = useState([]);

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

  const getDistance = () => {
    console.log(pets)
    console.log(shelters)

    const opts = {
        yName: 'latitude',
        xName: 'longitude'
    }
    
    const origin = { longitude: 4, latitude: 22}

    let shelter_distance = sortByDistance(origin, shelters, opts)

    let pets_distance = pets.map((pet, index) => {
      shelter_distance.map((shelter, index) => {
        if (pet.shelter == shelter.id) {
          pet['distance'] = shelter.distance
        }
      })

    }); 
  }

  return (
    <>        
      <button className="btn btn-primary" onClick={getDistance}>
        Find pets near me
      </button>
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
            <Link to={`/pet/${pet.id}`} className='name'>{pet.name}</Link>
          </div>
        ))}
      </div>

    </div>
    </>
  )
};

export default ShowPets;