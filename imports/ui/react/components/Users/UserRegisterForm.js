import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';


class UserRegisterForm extends Component {
  registerUser = (event) => {
    event.preventDefault();

    Accounts.createUser(
      {
        email: this.email.value,
        password: this.password.value,
      },
      (error) => {
        if (!error) {
          this.email.value = '';
          this.password.value = '';
      
          this.props.client.resetStore();          
        }
      }
    );

  }

  render() {
    return (
      <form onSubmit={this.registerUser}>
        <input type="email" placeholder="E-mail..." ref={(input) => this.email = input} />
        <input type="password" placeholder="Password..." ref={(input) => this.password = input} />
        <button type="submit">Register User</button>
      </form>
    );
  }
}


export default UserRegisterForm;
