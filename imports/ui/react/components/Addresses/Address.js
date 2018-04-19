import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';


const toggleAddressActive = gql`
  mutation toggleAddressActive($addressId: String!) {
    toggleAddressActive(addressId: $addressId) {
      _id
    }
  }
`;


class Address extends Component {
  toggleAddressActive = () => {
    this.props.toggleAddressActive({
      variables: {
        addressId: this.props.address._id
      },
    });
  }

  render() {
    return (
      <div>
        <input type="checkbox" onClick={this.toggleAddressActive} /> {this.props.address.postcode} {this.props.address.city}
      </div>
    );
  }
}


export default graphql(toggleAddressActive, {
  name: 'toggleAddressActive',
  options: {
    refetchQueries: [
      'Customers',
    ],
  },  
})(Address);
