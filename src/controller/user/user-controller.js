const userModel = require('../../model/user/user-model');
const stateModel = require('../../model/state/state-model');
const cityModel = require('../../model/city/city-model');
const streetModel = require('../../model/street/street-model');

const postUserProfile =  async (req, res) => {
    try {
        const { state_name, city_name, street_name, number, neighborhood, postal_code, complement, user_name, phone, cell_phone, email, cpf, cnpj } = req.body;

        const streetId = await getUserAddress(state_name, city_name, street_name, number, neighborhood, postal_code, complement);
        const formatedCpf = cpf?.replace(/[.-\s]/g, '');
        const formatedCnpj = cnpj?.replace(/[.-\s]/g, '');
        const formatedPhone = phone?.replace(/[()-\s]/g, '');
        const formatedCellPhone = cell_phone?.replace(/[()-\s]/g, '');

        const user = await userModel.createUserProfile(user_name, formatedPhone, formatedCellPhone, email, formatedCpf, formatedCnpj, streetId);

        res.status(201).send({result: {user: user}});
    } catch (error) {
        console.error('Error processing the request:', error);
        res.status(500).send({ message: 'Internal server error', error });
    }
}

const getAllUserProfile = async (req, res) => {
   try {
       const result = await userModel.getAllUserProfile();

       if(!result) {
           res.status(204).send({result});
       } else {
           res.status(200).send({result});
       }
   } catch (error) {
       console.error('Error processing the request:', error);
       res.status(500).send({ message: 'Internal server error', error });
   }
};

const getUserProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        const result = await userModel.getUserProfile(userId);

        if(!result) {
            res.status(204).send({result});
        } else {
            res.status(200).send({result});
        }
    } catch (error) {
        console.error('Error processing the request:', error);
        res.status(500).send({ message: 'Internal server error', error });
    }
};

const updateUserProfile =  async (req, res) => {
    try {
        const { state_name, city_name, street_name, number, neighborhood, postal_code, complement, user_name, phone, cell_phone, email, cpf, cnpj } = req.body
        const userId = req.params.id;

        const streetId = await getUserAddress(state_name, city_name, street_name, number, neighborhood, postal_code, complement);
        const formatedCpf = cpf?.replace(/[.-\s]/g, '');
        const formatedCnpj = cnpj?.replace(/[.-\s]/g, '');
        const formatedPhone = phone?.replace(/[()-\s]/g, '');
        const formatedCellPhone = cell_phone?.replace(/[()-\s]/g, '');

        const user = await userModel.updateUserProfile(userId, user_name, formatedPhone, formatedCellPhone, email, formatedCpf, formatedCnpj, streetId);

        res.status(200).send({result: {user: user}});
    } catch (error) {
        console.error('Error processing the request:', error);
        res.status(500).send({ message: 'Internal server error', error });
    }
}

const deleteUserProfile =  async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await userModel.deleteUserProfile(userId);

        res.status(200).send({result: {user: user}});
    } catch (error) {
        console.error('Error processing the request:', error);
        res.status(500).send({ message: 'Internal server error', error });
    }
}

const getUserAddress = async (stateName, cityName, streetName, number, neighborhood, postalCode, complement) => {
    let state = await stateModel.getState(stateName);
    if(!state) {
        state = await stateModel.createState(stateName);
    }

    let city = await cityModel.getCity(cityName, state.id);
    if(!city) {
        city = await cityModel.createCity(cityName, state.id);
    }

    let street = await streetModel.getStreet(streetName, number, neighborhood, postalCode, complement, city.id);
    if(!street) {
        street = await streetModel.createStreet(streetName, number, neighborhood, postalCode, complement, city.id);
    }

    return street.id;
}

module.exports = {
    getAllUserProfile,
    postUserProfile,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile
};
