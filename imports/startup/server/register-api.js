import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';
import merge from 'lodash/merge';

// schemas
import CustomerSchema from '../../api/customers/Customer.schema.graphql';
import AddressSchema from '../../api/addresses/Address.schema.graphql';
import UserSchema from '../../api/users/User.schema.graphql';

// resolvers
import CustomersResolvers from '../../api/customers/Customers.resolvers';
import AddressesResolvers from '../../api/addresses/Addresses.resolvers';
import UsersResolvers from '../../api/users/Users.resolvers';


// BUG: need to modify this file each time a .graphql file has changed
// ..............


const typeDefs = [
  CustomerSchema,
  AddressSchema,
  UserSchema,
];

const resolvers = merge(
  CustomersResolvers,
  AddressesResolvers,
  UsersResolvers,
);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});


createApolloServer({ schema });
