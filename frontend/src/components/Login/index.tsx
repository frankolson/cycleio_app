import React, { Component, Fragment } from 'react';
import { Creds } from '../../types';

interface LoginProps {
  errorMessage?: string;
  onLoginClick: (creds: Creds) => any;
}

interface LoginState {
  [field: string]: string;
  email: string;
  password: string;
}

class Login extends Component<LoginProps, LoginState> {
  state = {
    email: '',
    password: '',
  }

  handleChange = (field: string, value: string) => (
    this.setState({ [field]: value })
  )

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = this.state;

    this.props.onLoginClick({
      email: email.trim(),
      password: password.trim(),
    })
  };

  render() {
    const { errorMessage } = this.props;

    return (
      <div>
        <form onSubmit={this.handleSubmit} className="form-inline my-2 my-lg-0">
          <input
            type="email"
            onChange={input => this.handleChange('email', input.target.value)}
            className="form-control mr-sm-2"
            placeholder="Email"
            name="user[email]"
          />
          <input
            type="password"
            onChange={input => this.handleChange('password', input.target.value)}
            className="form-control mr-sm-2"
            placeholder="Password"
            name="user[password]"
          />

          <button type="submit" className="btn btn-outline-success my-2 my-sm-0">
            Login
          </button>
        </form>

        {errorMessage &&
          <p style={{ color: 'red', textAlign: 'right', margin:0 }}>
            {errorMessage}
          </p>
        }
      </div>
    );
  }
}

export default Login;
