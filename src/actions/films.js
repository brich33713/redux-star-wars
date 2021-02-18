import axios from 'axios';
import { LOAD_FILM } from "./types";


function getFilmFromAPI(id) {
  return async function (dispatch) {
    //makes a get request to api for a film based on url param
    const res = await axios.get(`https://swapi.dev/api/films/${id}/`);
    //deconstruct data from response
    let {
      title: name,
      director,
      opening_crawl: openingCrawl,
      characters,
      planets
    } = res.data;

    console.log(characters)

    //create an array of IDs for various characters/planets in the film
    characters = characters.map(url => url.match(/\d+/)[0]);
    planets = planets.map(url => url.match(/\d+/)[0]);

    // create object (film) to be passed into dispatch which will be an action
    const film = { id, name, director, openingCrawl, characters, planets };
    dispatch(gotFilm(film));
  };
}


function gotFilm(film) {
  return { type: LOAD_FILM, payload: film };
}


export { getFilmFromAPI }