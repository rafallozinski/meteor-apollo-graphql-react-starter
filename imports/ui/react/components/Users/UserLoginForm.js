import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import React, { Component } from 'react';


class UserLoginForm extends Component {
  loginUser = (event) => {
    event.preventDefault();

    Meteor.loginWithPassword(
      this.email.value,
      this.password.value,
      (error) => {
        if (!error) {
          this.props.client.resetStore();
        }
      }
    );

  }

  render() {
    return (
      <form onSubmit={this.loginUser}>
        <input type="email" placeholder="E-mail..." ref={(input) => this.email = input} />
        <input type="password" placeholder="Password..." ref={(input) => this.password = input} />
        <button type="submit">Login User</button>
      </form>
    );
  }
}


export default UserLoginForm;
