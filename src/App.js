import React from 'react';

import './App.css';

import Nav from './Components/Nav';
import Convert from './Pages/Convert';
import About from './Pages/About';
import Chuck from './Pages/Chuck';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
  return(
    <Router>
      <div className="App">
        <Nav/>
        <Switch>
          <Route path="/" exact component={About}/>
          <Route path="/convert" component={Convert}/>
          <Route path="/chuck" component={Chuck}/>
        </Switch>
      </div>
    </Router>
  );
};


export default App;
