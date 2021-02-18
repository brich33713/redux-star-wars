import { combineReducers } from "redux";
import films from "./films";
import planets from "./planets";
import people from "./people";

//RootReducer combines 3 reducers
export default combineReducers({
  films,
  planets,
  people,
});