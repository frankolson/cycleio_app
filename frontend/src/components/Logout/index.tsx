import React, { Component } from 'react';

interface LogoutProps {
  onLogoutClick: () => any;
}

class Logout extends Component<LogoutProps, {}> {
  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.onLogoutClick();
  }

  render() {
    return (
      <form onSubmit={this.props.onLogoutClick} className="form-inline my-2 my-lg-0">
        <button type="submit" className="btn btn-outline-primary my-2 my-sm-0">
          Logout
        </button>
      </form>
    )
  };
}

export default Logout;
