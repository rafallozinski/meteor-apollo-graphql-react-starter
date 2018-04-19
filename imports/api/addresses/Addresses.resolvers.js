import Addresses from './Addresses.collection';


export default {

  Mutation: {    
    createAddress(obj, { city, postcode, customerId }, { userId }) {
      if (userId) {
        const addressId = Addresses.insert(
          {
            city,
            postcode,
            customerId
          }
        );
  
        return Addresses.findOne(addressId);
      }
      
      throw new Error('Unauthorized');
    },
    
    toggleAddressActive(obj, { addressId }) {
      const address = Addresses.findOne(addressId);
      
      const newAddressActive = !address.active;

      Addresses.update(addressId, {
        $set: {
          active: newAddressActive
        },
      });

      return Addresses.findOne(addressId);
    },
  },
  
};
