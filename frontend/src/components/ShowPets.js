import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import '../App.css';
import axios from "axios";
import _ from 'underscore';
import {
  Button,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
const haversine = require('haversine')
const sortByDistance = require('sort-by-distance')

const ShowPets = () => {
  let [pets, setData] = useState([]);
  let [shelters, setShelter] = useState([]);
  let [location, setLocation] = useState([]);

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

  const getLocation = (postcode) => {
    if (postcode) {
      axios
      .get(`http://api.postcodes.io/postcodes/${postcode}`)
      .then((res) => {
        setLocation(res.data.result)
        console.log(res.data.result)
      }) 
      .catch((err) => window.alert("Please use a valid UK postcode!"));
    }

  }

  const sortPetsByDistance = () => {

    let start = {
      latitude: -0.117098,
      longitude: 51.50998
    }

    if (location.length != 0) {
      start = {
        latitude: location.latitude,
        longitude: location.longitude
      }
    }

    const opts = {
      yName: 'latitude',
      xName: 'longitude'
      } 

    shelters = sortByDistance(start, shelters, opts)

    shelters = shelters.map((shelter, index) => {
      shelter['km'] = haversine(start, {
        latitude: shelter.latitude,
        longitude: shelter.longitude
      })
      return shelter
    })

    console.log(shelters)

    let pets_distance = pets.map((pet, index) => {
      shelters.map((shelter, index) => {
        if (pet.shelter == shelter.id) {
          pet['km'] = shelter.km
        }
      })
      return pet
    }); 

    return _.sortBy(pets_distance, 'km')
  }

  return (
    <> 
    <FormGroup>
      <Label for="user-postcode">Enter your postcode to find pets near you:</Label>
      <Input
        type="text"
        id="user-postcode"
        name="user-postcode"
        placeholder="your postcode"
      />
    </FormGroup>
    <Button
        className="btn btn-primary"
        color="success"
        onClick={() => getLocation(document.querySelector('#user-postcode').value)}
      >
        Find pets near me
    </Button>
    <div className='all-pets'>
      <h1 className="mt-5">Pets avaialble for adoption</h1>
      <div className='row'>
        {sortPetsByDistance().map((pet, index) => (
            <Link to={"/pet/" + pet.id} className="block mt-4 col-sm-4" key={pet.id}>
              <div className='pet'>
                <div className='object-wrap'>
                  {pet.image == null 
                    ? <img src='http://localhost:8000/images/paw.png' className="img-fluid"></img>
                    : <img src={pet.image} className="img-fluid img-sizer"></img>
                  }
                </div>
              </div>
              <p>{pet.name}</p>
              {location.length != 0 ? <p>{parseInt(pet.km)}km from you</p> : null}
            </Link>       
        ))}
      </div>
    </div>
    </>
  )
};

export default ShowPets;