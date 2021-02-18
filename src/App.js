import React from 'react';
import { BrowserRouter } from 'react-router-dom'

import './App.css';

import NavBar from "./NavBar";
import Routes from "./Routes";


function App() {
  return (
    <div className="App container">
      <BrowserRouter>
        {/* Provides NavBar for entire app */}
        <NavBar />
        {/* Component to contain all routes */}
        <Routes />
      </BrowserRouter>
    </div>
  );
}


export default App;
