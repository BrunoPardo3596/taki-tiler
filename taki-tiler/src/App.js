import React, { Component } from 'react';
import './App.css';
//import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      email: '',
      password: '',
      emailValid: false,
      passwordValid: false,
      appPage: 'login'
    }
  }

  
  onSubmitHandler = () => {

    if(this.state.emailValid === true && this.state.passwordValid === true){
      document.body.style.cursor='wait';
      this.setState({appPage: "appPageX"})
    }
    else{
      console.log(this.state);
    }
    
  }

  emailChangedHandler = (event) => {
    const email = event.target.value;
    this.setState({email: email});

    const validateFormat = email.includes("@taqtile.com");
    this.setState({emailValid: validateFormat});
  }

  passwordChangedHandler = (event) => {
    const password = event.target.value;
    this.setState({password: password});
    
    const validateFormat = password.length >= 4;
    this.setState({passwordValid: validateFormat});
  }

  render() {

    let login = null;
    let appPageX = null;

    if(this.state.appPage === "login"){
      login = (

        <div>
          <header className="App-header">
            <h1 className="App-title">Welcome to Taki-Tiler</h1>
          </header>
          <fieldset>
              <legend>Sign in</legend>
              <div>
                <label htmlFor="userName">Username:</label>
                <input type="email" 
                      required 
                      pattern=".+@taqtile.com"
                      id="username" 
                      name="username" 
                      placeholder="taki-tiler@taqtile.com"
                      title="Please enter a valid email"
                      onBlur={this.emailChangedHandler}/>
              </div>
              <div>
                <label htmlFor="password">Password:</label>
                <input type="password" 
                      id="password" 
                      name="password"
                      minLength="4"  
                      required title="Password must contain at least 4 characters"
                      placeholder="4 characters minimum" 
                      onBlur={this.passwordChangedHandler}/>
              </div>
              <button value="Sign in" onClick={this.onSubmitHandler}>Sign In</button>
          </fieldset>
        </div>

      );
    }

    else{
      appPageX = (
        <div>
          <h1>OUTRA PAGINA</h1>
        </div>
      )
    }

    return (
      <div className="App">
        {login}
        {appPageX}
      </div>
    );

    // const login = () => (
    //   <div>
    //     <header className="App-header">
    //       <h1 className="App-title">Welcome to Taki-Tiler</h1>
    //     </header>
    //     <fieldset>
    //         <legend>Sign in</legend>
    //         <div>
    //           <label htmlFor="userName">Username:</label>
    //           <input type="email" 
    //                 required 
    //                 pattern=".+@taqtile.com"
    //                 id="username" 
    //                 name="username" 
    //                 placeholder="taki-tiler@taqtile.com"
    //                 title="Please enter a valid email"
    //                 onBlur={this.emailChangedHandler}/>
    //         </div>
    //         <div>
    //           <label htmlFor="password">Password:</label>
    //           <input type="password" 
    //                 id="password" 
    //                 name="password"
    //                 minLength="4"  
    //                 required title="Password must contain at least 4 characters"
    //                 placeholder="4 characters minimum" 
    //                 onBlur={this.passwordChangedHandler}/>
    //         </div>
    //         <button value="Sign in" onClick={this.onSubmitHandler}>Sign In</button>
    //     </fieldset>
    //   </div>
    // )

    // const nextPage = () => (
    //   <div>
    //      <h1>OUTRA PAGINA</h1>
    //   </div>
    // )

    // return (
    //   <Router>
    //     <div className="App">
    //       <Route exact path="/" component={login}/>
    //       <Route path="/nextPage" component={nextPage}/>
    //     </div>
    //   </Router>
    // );
  }
}

export default App;
