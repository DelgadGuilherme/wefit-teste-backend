const postValidateFields = (req, res, next) => {
    const { body } = req;
    const { user_name, cpf, email, confirm_email, postal_code, street_name, number, complement, city_name, neighborhood, state_name} = body;

    if (!body) {
        return res.status(400).json({ message: 'The body was not passed.' });
    }

    if (!user_name || !cpf || !email || !confirm_email || !postal_code || !street_name || !number || !city_name || !neighborhood || !state_name) {
        return res.status(400).json({ message: 'There are required parameters that were not passed.', required_parameters: 'user_name, cpf, email, confirm_email, postal_code, street_name, number, city_name, neighborhood, state_name' });
    }

    next();
}

module.exports = {
    postValidateFields
};
