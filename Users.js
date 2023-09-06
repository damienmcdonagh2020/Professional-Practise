import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button  from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      username: '',
      password: '',
      email: '',
    };
  }

  registerUser = () => {
    const { username, password, email } = this.state;
  
    // Prepare the registration data
    const registrationData = {
      username,
      password,
      email,
    };
  
    // Send a POST request to the server
    fetch('http://localhost:4000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registrationData),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Registration successful') {
          console.log(data.message);
        } else {
          console.error('Registration failed:', data.error);
        }
      })
      .catch(error => console.error('Error:', error));
  }
  

  loginUser = () => {
    const { username, password } = this.state;
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.message); 
      })
      .catch(error => console.error('Error:', error));
  }

  handleLogout = () => {
    // Clear the session or token
    sessionStorage.removeItem('loggedIn');
    // Update state to reflect the user is logged out
    this.setState({ isLoggedIn: false });
    // Redirect the user to the login page or perform other actions
  }

  componentDidMount() {
    // Check session status on page load
    const isLoggedIn = sessionStorage.getItem('loggedIn') === 'true';
    this.setState({ isLoggedIn });
  }

  render() {
    const { isLoggedIn, username, password, email } = this.state;

    return (
      <div>
        {isLoggedIn ? (
          <div>
            {/* Authenticated content */}
            <button onClick={this.handleLogout}>Logout</button>
          </div>
        ) : (
          <div>
            {/* Registration form */}
            <form>
              <h2>Register</h2>
              <div>
                <label>Username:</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => this.setState({ username: e.target.value })}
                />
              </div>
              <div>
                <label>Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => this.setState({ password: e.target.value })}
                />
              </div>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
              </div>
              <button onClick={this.registerUser}>Register</button>
            </form>

            {/* Login form */}
            <form>
              <h2>Login</h2>
              <div>
                <label>Username:</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => this.setState({ username: e.target.value })}
                />
              </div>
              <div>
                <label>Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => this.setState({ password: e.target.value })}
                />
              </div>
              <button onClick={this.loginUser}>Login</button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default Users;
