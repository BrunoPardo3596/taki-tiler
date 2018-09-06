import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from './Login/Login';
import PersonList from './PersonList/PersonList';


class App extends Component {
  constructor(props){
    super(props)
  }

  render() {

    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Login}/>
          <Route path="/personList" component={PersonList}/>
        </div>
      </Router>
    );
  }
}

export default App;