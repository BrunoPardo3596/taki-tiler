import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from './Login';

class App extends Component {
  constructor(props){
    super(props)
  }


  render() {

    const nextPage = () => (
      <div>
         <h1>OUTRA PAGINA</h1>
      </div>
    )

    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Login}/>
          <Route path="/nextPage" component={nextPage}/>
        </div>
      </Router>
    );
  }
}

export default App;
