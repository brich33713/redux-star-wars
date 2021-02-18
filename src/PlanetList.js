import React from 'react';
import {useSelector} from 'react-redux';
import ItemList from './ItemList'

function PlanetList() {
  //create an array of objects containing planet information, for planets in
  //store. List will grow over time.
  const items = useSelector(st => Object.values(st.planets).map(
    p => ({...p, url: `/planets/${p.id}`})
  ));
  return <ItemList title="Planets" items={items} />;
}

export default PlanetList;