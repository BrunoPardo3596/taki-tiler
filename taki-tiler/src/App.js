import React, { Component } from 'react';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <div>
          <header className="App-header">
            
            <h1 className="App-title">Welcome to Taki-Tiler</h1>
          </header>
          {/* <p className="App-intro">
            To begin this new experience, sign in!
          </p> */}
          <fieldset>
              <legend>Sign in</legend>
              <form>
                <div>
                    <label htmlFor="userName">Username:</label>
                    <input type="email" pattern=".+@taqtile.com"
                          id="username" name="username" placeholder="taki-tiler@taqtile.com"
                          required title="Please enter a valid email"/>
                </div>

                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password"
                          minLength="4" required title="Password must contain at least 4 characters"
                          placeholder="4 characters minimum" />
                </div>

                <input type="submit" value="Sign in" />
              </form>

          </fieldset>

          
        </div>
      </div>
    );
  }
}

export default App;
