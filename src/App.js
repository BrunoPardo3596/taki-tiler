import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from './Login/Login';
import PeopleList from './PeopleMapPage/PeopleMapPage';


class App extends Component {

  render() {

    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Login}/>
          <Route path="/peopleList" component={PeopleList}/>
        </div>
      </Router>
    );
  }
}

export default App;