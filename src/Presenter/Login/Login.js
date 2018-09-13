import React, { Component } from 'react';
import './Login.css';
import User from '../../Domain/UserUseCases';

class Login extends Component {
  constructor(props){
    super(props)

    this.user = User;

    this.state = {
      emailValid: false,
      passwordValid: false,
      data:{
        password: '',
        email: '',
        rememberMe: false,
      },
    }
  
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }
 
  onSubmitHandler = (event) => {
    event.preventDefault();
    if(this.state.emailValid && this.state.passwordValid){
      document.body.style.cursor='wait';
      this.user.validateUser(this.state.data).then(response => {
        if(response){
          this.props.history.push({ pathname: '/people-list' });
          document.body.style.cursor='default';
        } else {
          document.body.style.cursor='default'
          this.props.setAlert("danger", true, "Password or login don't match");
        }
      });
    } else {
      this.props.setAlert("danger", true, "Fill the required infos");
    }
  }

  emailChangedHandler = (event) => {
    const email = event.target.value;
    const data = {...this.state.data};
    data.email = email;
    const validateFormat = email.includes("@taqtile.com");
    this.setState({
      data : data,
      emailValid: validateFormat,
    });
  }

  passwordChangedHandler = (event) => {
    const password = event.target.value;
    const data = {...this.state.data};
    data.password = password;
    const validateFormat = password.length >= 4;
    this.setState({
      data: data,
      passwordValid: validateFormat,
    });
  }

  render() {
    return (
      <div>
        <header className="App-header">
          <h1 className="App-title">Welcome to Taki-Tiler</h1>
        </header>
        <form onSubmit={this.onSubmitHandler}>
          <fieldset>
            <legend>Sign in</legend>
            <div>
              <label htmlFor="userName">Username:</label>
              <input
                type="email" 
                required 
                pattern=".+@taqtile.com"
                id="username" 
                name="username" 
                placeholder="taki-tiler@taqtile.com"
                title="Please enter a valid email"
                value={this.state.email}
                onChange={this.emailChangedHandler}
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input type="password" 
                id="password" 
                name="password"
                minLength="4"  
                required title="Password must contain at least 4 characters"
                placeholder="4 characters minimum" 
                onChange={this.passwordChangedHandler}/>
            </div>
            <button>Sign In</button>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default Login;