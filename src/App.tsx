import React from 'react';
import { GtHeader } from './components/gt-header/gt-header.component';
import './App.css';
import Routes from './routes';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import {  } from 'react-router';


const App: React.FC = () => {
  return (
    <div>
      <Router>
        <GtHeader>
        </GtHeader>
        <div className="route-container"> 
          <Link to="/">Home</Link>
          <Link to="/hotel-details">Hotel Details</Link>
          <Link to="/confirmation">Confirmation</Link>
          <Routes />
        </div>
      </Router>
    </div>
  );
}

export default App;
