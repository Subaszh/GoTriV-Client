import React from 'react';
import './App.css';
import Routes from './routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { GtHeader } from './components/gt-header/gt-header.component';

const App: React.FC = () => {
  return (
    <Router>
      <GtHeader></GtHeader>
        <div className="route-container">
        <Routes />
      </div>
    </Router>
  );
}

export default App;
