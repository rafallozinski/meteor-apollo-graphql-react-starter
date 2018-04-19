import React from 'react';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';

import CustomerCreateForm from '../Customers/CustomerCreateForm';
import AddressCreateForm from '../Addresses/AddressCreateForm';
import UserRegisterForm from '../Users/UserRegisterForm';
import UserLoginForm from '../Users/UserLoginForm';
import UserLogoutForm from '../Users/UserLogoutForm';
import Address from '../Addresses/Address';


const customersQuery = gql`
query Customers {
  customers {
    _id
    name
    active
    addresses {
        _id
        city
        postcode
      }
  }
  user {
    _id
  }
}
`;


const App = ({ loading, customers, client, user }) => {
  if (loading) {
    return null;
  }
  
  return (
    <div>
      <header class="app-header">
        <div class="heading">
          <h1>GraphQL with Meteor, Apollo and React</h1>
          <p>0.1  2018-04-13</p>
        </div>
        <div class="user">
          { user._id ? (
            <div>
              <UserLogoutForm client={client} />
            </div>
          ) : (
            <div>
              <UserRegisterForm client={client} />
              <UserLoginForm client={client} />              
            </div>
          )
          }
        </div>
      </header>
      <main class="app-content">
        { user._id ? (
          <div>
            <CustomerCreateForm />
            <h2>Customers</h2>
            <ul>
            {customers.map(customer => (
              <li key={customer._id}>
                <h3>{customer.name}</h3>
                <p>Addresses:</p>
                <ul>
                {customer.addresses.map(address => (
                  <li>
                    <Address address={address} key={address._id} />
                  </li>
                ))}
                </ul>
                <AddressCreateForm customerId={customer._id} />
              </li>
            ))}
            </ul>
          </div>
        ) : (
          <div>
            <p>Please login to view the content...</p>
          </div>
        )}
      </main>
      <footer class="app-footer">
        <hr/>
        <p>&copy; 2018</p>
      </footer>
    </div>
  );
};


export default graphql(customersQuery, {
  props: ({ data }) => ({ ...data })
})(withApollo(App));
