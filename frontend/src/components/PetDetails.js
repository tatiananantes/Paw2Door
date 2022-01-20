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
    <div className="all-pets">
      <div className='container'>
        <div className='row'>
          {pets.map((pet) => {
            if (String(pet.id) == String(window.location.href.match(/\/([^\/]+)\/?$/)[1])) {
            return (
            <section className="pet-profile col-sm-12 mt-5">
              <div className='row' key={pet.id}>
                <div className="col-sm-6">
                  <div className='object-wrap'>
                    {pet.image == null 
                      ? <img src='http://localhost:8000/images/paw.png' className="img-fluid"></img>
                      : <img src={pet.image} className="img-fluid img-thumbnail img-rounded"></img>
                    } 
                  </div>
                </div>
                <div className="col-sm-6">
                    <div className="shelter-block">
                      <h1 className='name'>{pet.name}</h1>
                      <p>Age: {pet.age}</p>
                      <p>Sex: {pet.gender}</p>
                      <h2>About</h2>
                      <p>{pet.bio}</p>
                    </div>
                </div>
              </div>
              <div className="row mt-4">
                  {shelter.map((shelter) => {
                    if (shelter.id == pet.shelter) {
                      return (
                        <div className="col-sm-12 shelter-block mt-4">
                          <h2>Contact details</h2>
                          <div className='shelter' key={shelter.id}>
                            <p className='name'>Shelter: <a href={'/shelter/' + shelter.id}>{shelter.name}</a></p>
                            <p className='email'>Email: <a href={'mailto:' + shelter.email}>{ shelter.email}</a></p>
                            <p className='phone_number'>Phone Number: {shelter.phone_number}</p>
                          </div>
                        </div>
                      )}
                    }
                  )}
              </div>
            </section>
          )}}
          )}
        </div>
      </div>
    </div>
  )

};

export default PetDetails;