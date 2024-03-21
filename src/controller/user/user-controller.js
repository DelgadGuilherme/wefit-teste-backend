const userModel = require('../../model/user/user-model');

const stateController = require('../state/state-controller');
const cityController = require('../city/city-controller');
const streetController = require('../street/street-controller');
const postUserProfile =  async (req, res) => {
    try {
        const { state_name, city_name, street_name, number, neighborhood, postal_code, complement } = req.body;

        const state = await stateController.getState(state_name);
        const city = await cityController.getCity(city_name, state.id);
        const street = await streetController.getStreet(street_name, number, neighborhood, postal_code, complement, city.id);

        res.status(200).send({state: state, city: city, street: street});
    } catch (error) {
        console.error('Error processing the request:', error);
        res.status(500).send({ message: 'Internal server error', error });
    }
}

const getAllUserProfile = async (req, res) => {
    const result = await userModel.getAllUserProfile( (err, data) => {
        if(err) {
            res.status(500).send({message: err.message || 'Error'});
        } else if (data.length === 0) {
            res.status(204).send(data)
        } else {
            res.send(data);
        }
    });
};

module.exports = {
    getAllUserProfile,
    postUserProfile
};
