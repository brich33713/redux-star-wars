import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { getPlanetFromAPI } from "./actions/planets";
import Sublist from "./Sublist";


function Planet() {
  //set variables that will used to populate page and child components

  //id is film number which will be used for API call and pulling data from store
  const {id} = useParams();
  const planet = useSelector(st => st.planets[id]);

  //arrays filled with IDs of all films/characters currently in store
  const filmState = useSelector(st => st.films);
  const characterState = useSelector(st => st.people);
  const dispatch = useDispatch();
  //if planet has already been visited missing will be false and vice versa
  const missing = !planet;

  useEffect(function() {
    if (missing) {
    //if planet hasn't already been added to the state, add it. 
    //Once added page will rerender and planet will now exist
      dispatch(getPlanetFromAPI(id));
    }
  }, [missing, id, dispatch]);

  // Until planet is loaded into store show a loading message
  if (missing) return "loading...";

  // for each character/film associated with the planet create an object with film/character id, 
  // url for API request, and reveal name if already in store. 
  // Array of objects will be passed down in the requisite child component
  const films = planet.films.map(fid => ({
    id: fid,
    url: `/films/${fid}`,
    display: filmState[fid] ? filmState[fid].name : "Unknown"
  }));

  const residents = planet.residents.map(pid => ({
    id: pid,
    url: `/people/${pid}`,
    display: characterState[pid] ? characterState[pid].name : "Unknown"
  }));

  return (
    <div>
      <h1 className="mt-3 mb-3">
        {planet.name}
        <small className="text-muted float-right">{id}</small>
      </h1>

      <p><b>Climate: </b>{planet.climate}</p>
      <p><b>Population: </b>{planet.population}</p>

      <Sublist title="People" items={residents} />
      <Sublist title="Films" items={films} />
    </div>
  );
}

export default Planet;
