import { LOAD_PLANET, RESET_ALL } from "../actions/types";

const INITIAL_STATE = {};


function planets(state = INITIAL_STATE, action) {
//as planets are visited store is updated one planet at a time
// functionality for resetting 'knowledge base'
  switch (action.type) {
    case RESET_ALL:
      return { ...INITIAL_STATE };

    case LOAD_PLANET:
      return {
        ...state,
        [action.payload.id]: { ...action.payload }
      };

    default:
      return state;
  }
}

export default planets;