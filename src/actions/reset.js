import { RESET_ALL } from "./types";

//called on HomePage component. Clears state ack to an empty object
function resetAll() {
  return { type: RESET_ALL }
}


export { resetAll }