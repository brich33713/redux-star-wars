import { LOAD_FILM, RESET_ALL } from "../actions/types";

const INITIAL_STATE = {};

//as films are visited store is updated one film at a time
// functionality for resetting 'knowledge base'
function films(state = INITIAL_STATE, action) {
  switch (action.type) {
    case RESET_ALL:
      return { ...INITIAL_STATE };

    case LOAD_FILM:
      return {
        ...state,
        [action.payload.id]: { ...action.payload }
      };

    default:
      return state;
  }
}

export default films;