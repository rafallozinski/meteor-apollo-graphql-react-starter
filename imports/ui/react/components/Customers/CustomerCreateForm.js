import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';


const createCustomer = gql`
  mutation createCustomer($name: String!) {
    createCustomer(name: $name) {
      _id
    }
  }
`;


class CustomerCreateForm extends Component {
  state = {
    error: null
  }

  submitForm = () => {
    this.props.createCustomer({
      variables: {
        name: this.name.value,
      }
    }).then(({ data }) => {
      this.name.value = '';
    }).catch((error) => {
      this.setState({
        error: error.message
      });
    });
  }

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <input type="text" placeholder="Customer name..." ref={(input) => this.name = input}/>
        <button onClick={this.submitForm}>Create Customer</button>
      </div>
    );
  }
};


export default graphql(createCustomer, {
  name: 'createCustomer',
  options: {
    refetchQueries: [
      'Customers',
    ],
  },
})(CustomerCreateForm);
