import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class Login extends Component {
  constructor(props){
    super(props)

    this.state = {

        data:[{
          password : '',
          email : '',
          rememberMe:false
         }],
        
        emailValid: false,
        passwordValid: false
      }
  
      this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  
  onSubmitHandler = () => {

    if(this.state.emailValid === true && this.state.passwordValid === true){
        document.body.style.cursor='wait';
        axios.post('https://tq-template-server-sample.herokuapp.com/authenticate', this.state.data)
          .then(response => {
            localStorage.setItem("token", response.data.data.token),
            localStorage.setItem("name", response.data.data.user.name),
            this.props.history.push({ pathname: '/nextPage' });
            document.body.style.cursor='default'})
          .catch((err) => {
            document.body.style.cursor='default'
            alert("Password or login don't match");
          });
      }
      else console.log(this.state);
    
  }

  emailChangedHandler = (event) => {
    const email = event.target.value;


    const data = {...this.state.data};

    data.email = email;

    this.setState({data: data});

    const validateFormat = email.includes("@taqtile.com");
    this.setState({emailValid: validateFormat});
  }

  passwordChangedHandler = (event) => {
    const password = event.target.value;


    const data = {...this.state.data};
    
    data.password = password;

    this.setState({data: data});
    
    const validateFormat = password.length >= 4;
    this.setState({passwordValid: validateFormat});
  }

  render() {
    return (
      <div>
        <header className="App-header">
          <h1 className="App-title">Welcome to Taki-Tiler</h1>
        </header>
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
                onBlur={this.passwordChangedHandler}/>
            </div>
            <button value="Sign in" onClick={this.onSubmitHandler}>Sign In</button>
        </fieldset>
      </div>
    );
  }
}

export default Login;
