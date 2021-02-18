import React from 'react';
import { Link } from "react-router-dom";


function Sublist({title, items}) {
  //creates a list on page. Components are title (self explanatory) and items which is an array of objects. 
  // Loop over items to create a bulleted list with links to various items
  return (
    <>
      <h3>{ title }</h3>
      <ul>
        {items.map(item =>
          <li key={item.id}><Link to={item.url}>{item.display}</Link></li>
        )}
      </ul>
    </>
  );
}

export default Sublist;