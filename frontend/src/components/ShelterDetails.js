import React, {useEffect, useState } from "react";
import '../App.css';

const ShelterDetails = () => {
  const [shelters, setData] = useState([]);

  useEffect(() => {
    const url = "http://localhost:8000/api/shelter/find/";

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
    <div className='form-search-wrap'>
      <div className="container relative">
        <div className='row pt-4 pb-4'>
          {shelters.map((shelter, index) => {
            if (String(shelter.id) == String(window.location.href.match(/\/([^\/]+)\/?$/)[1])) {
            return (
            <div className='shelter text-center text-white col-sm-12' key={shelter.id}>
              <h1 className='name'>{shelter.name}</h1>
              <p className='email'>Email: { shelter.email}</p>
              <p className='phone_number'>Phone Number: {shelter.phone_number}</p>
            </div>
          )}}
          )}
        </div>
      </div>
    </div>
  )
};

export default ShelterDetails;