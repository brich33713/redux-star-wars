import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { getPersonFromAPI } from "./actions/people";
import Sublist from "./Sublist";


function Person() {
  //set variables that will used to populate page and child components
  
  //id is person number which will be used for API call and pulling data from store
  const {id} = useParams();
  const person = useSelector(st => st.people[id]);
  
  //arrays filled with IDs of all planets/films currently in store
  const planetState = useSelector(st => st.planets);
  const filmState = useSelector(st => st.films);

  const dispatch = useDispatch();
  //if person has already been visited missing will be false and vice versa
  const missing = !person;

  useEffect(function() {
    //if person hasn't already been added to the state, add it. Once added page will rerender and person will now exist
    if (missing) {
      dispatch(getPersonFromAPI(id));
    }
  }, [id, missing, dispatch]);

  // Until person is loaded into store show a loading message
  if (missing) return "loading...";

  //A person only has one homeworld. Create an object with id, url and display
  //to create a link to /planet/:id
  const hw = person.homeworld;
  const homeworld = {
    id: hw,
    url: `/planets/${hw}`,
    display: planetState[hw] ? planetState[hw].name : "Unknown"
  };

  // for each film associated with the person create an object with film id, 
  // url for API request, and reveal name if already in store. 
  // Array of objects will be passed down in the requisite child component
  const films = person.films.map(fid => ({
    id: fid,
    url: `/films/${fid}`,
    display: filmState[fid] ? filmState[fid].name : "Unknown"
  }));

  return (
    <div>
      <h1 className="my-3">
        {person.name}
        <small className="text-muted float-right">{person.id}</small>
      </h1>

      <p><b>Gender: </b>{person.gender}</p>
      <p><b>Birth Year: </b>{person.birthYear}</p>
      <p>
        <b>Homeworld: </b>
        <Link to={homeworld.url}>{homeworld.display}</Link>
      </p>

      <Sublist title="Films" items={films} />
    </div>
  );
}

export default Person;

