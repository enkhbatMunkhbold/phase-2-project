import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Navbar from './components/Navbar';
import Home from './components/Home';
import List from './components/List';
import Create from './components/Create';
import RestaurantDetails from './components/RestaurantDetails';
import './stylesheets/app.css';

const App = () => {

  const [restaurants, setRestaurants] = useState([]);  
  // const [selected, setSelected] = useState({})

  useEffect(() => {
    fetch('http://localhost:6001/restaurants')
    .then(res => res.json())
    .then(data => setRestaurants(data));
  }, []);

  function handleUpdateList(updatedRestaurant) {
    const updatedList = restaurants.map(rest => rest.id === updatedRestaurant.id ? updatedRestaurant : rest)
    // setRestaurants(prevState => prevState.map(restaurant => restaurant.id === updatedRestaurant.id? updatedRestaurant : restaurant))
    setRestaurants(updatedList)
  }

  function handleAddRestaurant(data) {
    setRestaurants([...restaurants, data])
  }  

  // function handleSelectRestaurant(restaurant) {
  //   setSelected(restaurant)
  // }

  return (
    <div className='App'>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={
            <Home restaurants={restaurants}
              onUpdateList={handleUpdateList}               
              // onSelectRestaurant={handleSelectRestaurant}
            />} 
          />
          <Route path="/restaurants" element={
            <List restaurants={restaurants} 
              onUpdateList={handleUpdateList}               
              // onSelectRestaurant={handleSelectRestaurant}
            />} 
          />
          <Route path="/restaurants/new" element={<Create onAddRestaurant={handleAddRestaurant}/>} />
          {/* <Route path="/restaurants/:id" element={<RestaurantDetails restaurant={selected}/>} /> */}
          <Route path="/restaurants/:id" element={<RestaurantDetails/>} />
        </Routes>
    </Router>
    </div>
  );
}

export default App;
