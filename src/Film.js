import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {useParams} from "react-router-dom";
import { getFilmFromAPI } from "./actions/films";
import Sublist from "./Sublist";


function Film() {
  //set variables that will used to populate page and child components
  
  //id is film number which will be used for API call and pulling data from store
  const {id} = useParams();
  const film = useSelector(st => st.films[id]);

  //arrays filled with IDs of all planets/characters currently in store
  const planetState = useSelector(st => st.planets);
  const characterState = useSelector(st => st.people);
  
  const dispatch = useDispatch();
  //if film has already been visited missing will be false and vice versa
  const missing = !film;

  useEffect(function() {
    //if film hasn't already been added to the state, add it. Once added page will rerender and film will now exist
    if (missing) {
      dispatch(getFilmFromAPI(id));
    }
  }, [missing, id, dispatch]);

  // Until film is loaded into store show a loading message
  if (missing) return <h1 className="mt-5">loading...</h1>;

  // for each character/planet in the film create an object with planet/character id, 
  // url for API request, and reveal name if already in store. 
  // Array of objects will be passed down in the requisite child component
  const planets = film.planets.map(pid => ({
    id: pid,
    url: `/planets/${pid}`,
    display: planetState[pid] ? planetState[pid].name : "Unknown"
  }));

  const characters = film.characters.map(cid => ({
    id: cid,
    url: `/people/${cid}`,
    display: characterState[cid] ? characterState[cid].name : "Unknown"
  }));

  return (
    <div>

      <h1 className="mt-3 mb-3">
        {film.name}
        <small className="text-muted float-right">{id}</small>
      </h1>

      <p className="lead">{film.openingCrawl}</p>

      <p><b>Director: </b>{film.director}</p>

      <Sublist title="Planets" items={planets} />
      <Sublist title="People" items={characters} />
    </div>
  );
}

export default Film;