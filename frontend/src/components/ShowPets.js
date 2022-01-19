import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import axios from "axios";
import _ from "underscore";
import { Button, FormGroup, Input, Label } from "reactstrap";
const haversine = require("haversine");
const sortByDistance = require("sort-by-distance");

const ShowPets = () => {
  let [pets, setPets] = useState([]);
  let [shelters, setShelter] = useState([]);
  let [location, setLocation] = useState([]);
  let [species, setSpecies] = useState();
  let [postcode, setPostcode] = useState();
  let [radius, setRadius] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/pet/");
        const json = await response.json();
        setPets(json);
      } catch (error) {
        console.log("error", error);
      }
    };

    const fetchShelterDetails = async () => {
      await axios
        .get("http://localhost:8000/api/shelter/find/")
        .then((res) => {
          setShelter(res.data);
        })
        .catch((err) => console.log(err));
    };
    setLocation(undefined);
    setSpecies("All");
    setRadius("All");
    fetchShelterDetails();
    fetchData();
  }, []);

  const getLocation = () => {
    if (postcode == '') {
      setLocation(undefined);
    }
    axios
      .get(`http://api.postcodes.io/postcodes/${postcode}`)
      .then((res) => {
        setLocation(res.data.result);
      })
      .catch((err) => {
        window.alert("Please use a valid UK postcode!")
        setLocation(undefined);
      })
  };

  const sortPetsByDistance = () => {
    let start = {
      latitude: -0.117098,
      longitude: 51.50998,
    };

    if (location != undefined) {
      start = {
        latitude: location.latitude,
        longitude: location.longitude,
      };
    }

    const opts = {
      yName: "latitude",
      xName: "longitude",
    };

    shelters = sortByDistance(start, shelters, opts);

    shelters = shelters.map((shelter, index) => {
      shelter["km"] = haversine(start, {
        latitude: shelter.latitude,
        longitude: shelter.longitude,
      });
      return shelter;
    });

    let pets_distance = pets.map((pet, index) => {
      shelters.map((shelter, index) => {
        if (pet.shelter == shelter.id) {
          pet["km"] = shelter.km;
        }
      });
      return pet;
    });

    return filterBySpecies(_.sortBy(pets_distance, "km"));
  };

  const filterBySpecies = (pets) => {
    if (species == "Cat") {
      const cats = pets.filter(function (pet) {
        return pet.species == "Cat";
      });
      return filterByDistance(cats);
    } else if (species == "Dog") {
      const dogs = pets.filter(function (pet) {
        return pet.species == "Dog";
      });
      return filterByDistance(dogs);
    } else {
      return filterByDistance(pets);
    }
  };

  const filterByDistance = (pets) => {
    if (radius != 'All') {
      return pets.filter(function (pet) {
        return pet.km < radius;
      });
    } else {
      return pets;
    }
  };

  return (
    <section>
      <div className="form-search-wrap">
        <div className="container relative">
          <FormGroup>
            <Label for="user-postcode" className="text-white">
              Enter your postcode to find pets near you:
            </Label>
            <Input
              type="text"
              id="user-postcode"
              name="user-postcode"
              placeholder="your postcode"
              onChange={(e) => setPostcode(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="species" className="text-white">Species</Label>
            <Input
              type="select"
              id="species"
              name="species"
              onChange={(e) => setSpecies(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="radius" className="text-white">Search radius</Label>
            <Input
              type="select"
              id="radius"
              name="radius"
              onChange={(e) => setRadius(e.target.value)}
            >
              <option value="All">All</option>
              <option value="10">10km</option>
              <option value="25">25km</option>
              <option value="50">50km</option>
              <option value="100">100km</option>
            </Input>
          </FormGroup>
          <Button
            className="btn btn-primary mt-3"
            color="warning"
            onClick={() => getLocation()}
          >
            Find Pets
          </Button>
        </div>

      </div>

      <div className="all-pets">
        <div className="container">
          <h1 className="pt-5 pb-3 text-center">Pets looking for a new home</h1>
          <div className="row">
            {sortPetsByDistance().map((pet, index) => (
              <div class="col-sm-4">
                <Link
                  to={"/pet/" + pet.id}
                  className="block pet mt-4"
                  key={pet.id}
                >
                  <div className="object-wrap">
                    {pet.image == null ? (
                      <img
                        src="/images/paw.png"
                        className="img-fluid"
                      ></img>
                    ) : (
                      <img src={pet.image} className="img-fluid img-sizer"></img>
                    )}
                  </div>
                  <div className="text-wrap">
                    <p><strong>{pet.name}</strong></p>
                    {location != undefined ? (
                      <p className="distance">{parseInt(pet.km)}km away</p>
                    ) : null}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowPets;
