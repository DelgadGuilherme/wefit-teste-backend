const userModel = require('../../model/user/user-model');

const stateController = require('../state/state-controller');
const cityController = require('../city/city-controller');
const streetController = require('../street/street-controller');
const postUserProfile =  async (req, res) => {
    try {
        const { state_name, city_name, street_name, number, neighborhood, postal_code, complement, user_name, phone, cell_phone, email, cpf, cnpj } = req.body;

        const state = await stateController.getState(state_name);
        const city = await cityController.getCity(city_name, state.id);
        const street = await streetController.getStreet(street_name, number, neighborhood, postal_code, city.id, complement);

        const formatedCpf = cpf?.replace(/[.-\s]/g, '');
        const formatedCnpj = cnpj?.replace(/[.-\s]/g, '');
        const formatedPhone = phone?.replace(/[()-\s]/g, '');
        const formatedCellPhone = cell_phone?.replace(/[()-\s]/g, '');

        const user = await userModel.createUserProfile(user_name, formatedPhone, formatedCellPhone, email, formatedCpf, formatedCnpj, street.id);

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

        console.log(userId);

        const state = await stateController.getState(state_name);
        const city = await cityController.getCity(city_name, state.id);
        const street = await streetController.getStreet(street_name, number, neighborhood, postal_code, city.id, complement);

        const formatedCpf = cpf?.replace(/[.-\s]/g, '');
        const formatedCnpj = cnpj?.replace(/[.-\s]/g, '');
        const formatedPhone = phone?.replace(/[()-\s]/g, '');
        const formatedCellPhone = cell_phone?.replace(/[()-\s]/g, '');

        const user = await userModel.updateUserProfile(userId, user_name, formatedPhone, formatedCellPhone, email, formatedCpf, formatedCnpj, street.id);

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


module.exports = {
    getAllUserProfile,
    postUserProfile,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile
};
