import axios from "axios";
import { LOAD_PERSON } from "./types";


function getPersonFromAPI(id) {
  return async function (dispatch) {
    //makes a get request to api for a person based on url param
    const res = await axios.get(`https://swapi.dev/api/people/${id}/`);
    //deconstruct data from response
    let {
      name,
      gender,
      birth_year: birthYear,
      homeworld,
      films
    } = res.data;

    //create an array of IDs for various films character is in
    //also gets homeworld id
    films = films.map(url => url.match(/\d+/)[0]);
    homeworld = homeworld.match(/\d+/)[0];

// create object (person) to be passed into dispatch which will be an action
    const person = { id, name, gender, birthYear, homeworld, films };
    dispatch(gotPerson(person));
  };
}


function gotPerson(person) {
  return { type: LOAD_PERSON, payload: person };
}


export { getPersonFromAPI }