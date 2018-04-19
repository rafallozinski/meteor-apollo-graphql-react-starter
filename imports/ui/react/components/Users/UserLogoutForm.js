import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';


class UserLogoutForm extends Component {
  logoutUser = (event) => {
    event.preventDefault();

    Meteor.logout(
      (error) => {
        if (!error) {
          this.props.client.resetStore();
        }
      }
    );
  }

  render() {
    return (
      <button onClick={this.logoutUser}>Logout</button>
    );
  }
}


export default UserLogoutForm;
