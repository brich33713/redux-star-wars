import axios from "axios";
import { LOAD_PLANET } from "./types";


function getPlanetFromAPI(id) {
  return async function (dispatch) {
    //makes a get request to api for a film based on url param
    const res = await axios.get(`https://swapi.dev/api/planets/${id}/`);
    //deconstruct data from response
    let {
      name,
      population,
      climate,
      residents,
      films
    } = res.data;

   //create an array of IDs for various characters/films associated with planet
    residents = residents.map(url => url.match(/\d+/)[0]);
    films = films.map(url => url.match(/\d+/)[0]);

    // create object (planet) to be passed into dispatch which will be an action
    const planet = { id, name, population, climate, residents, films };
    dispatch(gotPlanet(planet));
  };
}


function gotPlanet(planet) {
  return { type: LOAD_PLANET, payload: planet };
}


export { getPlanetFromAPI }