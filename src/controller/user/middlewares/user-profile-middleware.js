const idValidate = (req, res, next) => {
    const { params } = req;
    const { id } = params;

    if (!params) {
        return res.status(400).json({ message: 'The params was not passed.' });
    }

    if(!id || !Number.isInteger(parseInt(id))) {
        return res.status(400).json({ message: 'There are required parameters that were not passed.', required_parameters: 'id' });
    }

    next();
}

const bodyValidateFields = (req, res, next) => {
    const { body } = req;
    const { user_name, cpf, email, confirm_email, postal_code, street_name, number, complement, city_name, neighborhood, state_name} = body;

    if (!body) {
        return res.status(400).json({ message: 'The body was not passed.' });
    }

    if (!user_name || !cpf || !email || !confirm_email || !postal_code || !street_name || !number || !city_name || !neighborhood || !state_name) {
        return res.status(400).json({ message: 'There are required parameters that were not passed.', required_parameters: 'user_name, cpf, email, confirm_email, postal_code, street_name, number, city_name, neighborhood, state_name' });
    }

    if(email !== confirm_email) {
        return res.status(400).json({ message: 'Emails do not match.' });
    }

    next();
}

module.exports = {
    bodyValidateFields,
    idValidate,
};
