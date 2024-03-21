const stateModel = require('../../model/state/state-model');

const getState =  async (stateName) => {
    try {
        let state = await stateModel.getState(stateName);

        if(!state) {
            state = await stateModel.createState(stateName);
        }

        return state;
    } catch (error) {
        console.error('Error retrieving or creating a state:', error);
        throw new Error('Error retrieving or creating a stat');
    }
}

module.exports = {
    getState
};
