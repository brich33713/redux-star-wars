import  { composeWithDevTools} from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

import thunk from "redux-thunk";
import root from "./reducers/root";
import { createStore, applyMiddleware } from "redux";

const persistConfig = {
  key: "root",
  storage,
  //using automergeLevel2 means inital state will be copied and 
  //only overriden with keys that persiste
  stateReconciler: autoMergeLevel2
};

//reducer function: persistConfig - state, state is being stored in storage
//through redux-persist. Root is combined 3 actions films, persons, planets
const persistedReducer = persistReducer(persistConfig, root);

//adds thunk middleware to store
export const store = createStore(
  persistedReducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  )
);

//will be passed as persistor in to PersistGate. PersistGate is the name of Provider
export const persistedStore = persistStore(store);

