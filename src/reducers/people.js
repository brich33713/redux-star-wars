import { LOAD_PERSON, RESET_ALL } from "../actions/types";

const INITIAL_STATE = {};


function people(state = INITIAL_STATE, action) {
//as people are revealed store is updated one person at a time
//functionality for resetting 'knowledge base'
  switch (action.type) {
    case RESET_ALL:
      return { ...INITIAL_STATE };

    case LOAD_PERSON:
      return {
        ...state,
        [action.payload.id]: { ...action.payload }
      };

    default:
      return state;
  }
}

export default people;