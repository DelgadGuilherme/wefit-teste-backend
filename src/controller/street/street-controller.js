const streetModel = require('../../model/street/street-model');

const getStreet =  async (streetName, number, neighborhood, postalCode, complement, cityId) => {
    try {
        let street = await streetModel.getStreet(streetName, number, neighborhood, postalCode, complement, cityId);

        if(!street) {
            street = await streetModel.createStreet(streetName, number, neighborhood, postalCode, complement, cityId);
        }

        return street;
    } catch (error) {
        console.error('Error retrieving or creating a street:', error);
        throw new Error('Error retrieving or creating a street');
    }
}

module.exports = {
    getStreet
};
