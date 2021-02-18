import React from 'react';
import { useSelector } from 'react-redux';

import ItemList from './ItemList'

function PersonList() {
  //create an array of objects containing people information, for people in
  //store. List will grow over time.
  const items = useSelector(st => Object.values(st.people).map(
    p => ({...p, url: `/people/${p.id}`})
  ));
  return <ItemList title="People" items={items} />;
}

export default PersonList;