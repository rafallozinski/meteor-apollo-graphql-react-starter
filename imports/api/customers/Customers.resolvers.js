import Customers from './Customers.collection';
import Addresses from '../addresses/Addresses.collection';


export default {

  Query: {
    customers(obj, args, { userId }) {
      return Customers.find({
        userId
      }).fetch();
    },
  },

  Customer: {
    addresses: (customer) => {
      const customerId = customer._id;
            
      return Addresses.find({
        customerId
      }).fetch();
    },
    active: (customer) => {
      const customerId = customer._id;

      const addresses = Addresses.find({
        customerId
      }).fetch();

      return true;
    },
  },

  Mutation: {
    createCustomer(obj, { name }, { userId }) {
      if (userId) {
        const customerId = Customers.insert(
          {
            name,
            userId
          }
        );

        return Customers.findOne(customerId);
      }

      throw new Error('Unauthorized');
    },
  },
  
};
