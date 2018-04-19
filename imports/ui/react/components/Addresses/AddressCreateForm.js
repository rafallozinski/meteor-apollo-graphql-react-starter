import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';


const createAddress = gql`
  mutation createAddress($city: String!, $postcode: String, $customerId: String!) {
    createAddress(city: $city, postcode: $postcode, customerId: $customerId) {
      _id
    }
  }
`;

class AddressCreateForm extends Component {
  state = {
    error: null
  }

  submitForm = () => {
    this.props.createAddress({
      variables: {
        city: this.city.value,
        postcode: this.postcode.value,
        customerId: this.props.customerId,
      }
    }).then(({ data }) => {
      this.city.value = '';
      this.postcode.value = '';
    }).catch((error) => {
      this.setState({
        error: error.message
      });
    });
  }

  render() {
    return (
      <div>
        <input type="text" placeholder="Postcode..." ref={(input) => this.postcode = input}/>
        <input type="text" placeholder="City..." ref={(input) => this.city = input}/>
        <button onClick={this.submitForm}>Create Address</button>
      </div>
    );
  }
};


export default graphql(createAddress, {
  name: 'createAddress',
  options: {
    refetchQueries: [
      'Customers',
    ],
  },  
})(AddressCreateForm);
