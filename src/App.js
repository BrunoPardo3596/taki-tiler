import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from './Login/Login';
import PeopleList from './PeopleMapPage/PeopleMapPage';
import UserInfo from './UserInfo/UserInfo';


class App extends Component {

  render() {

    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Login}/>
          <Route path="/peopleList" component={PeopleList}/>
          <Route path="/userInfo" component={UserInfo}/>
        </div>
      </Router>
    );
  }
}

export default App;