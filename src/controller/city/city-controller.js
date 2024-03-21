const cityModel = require('../../model/city/city-model');

const getCity =  async (cityName, stateId) => {
    try {

        let city = await cityModel.getCity(cityName, stateId);

        if(!city) {
            city = await cityModel.createCity(cityName, stateId);
        }

        return city;
    } catch (error) {
        console.error('Error retrieving or creating a city:', error);
        throw new Error('Error retrieving or creating a stat');
    }
}

module.exports = {
    getCity
};
