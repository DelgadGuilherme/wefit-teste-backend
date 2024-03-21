const connection = require('../../connector/database-connector');


const getState = async (stateName) => {
    console.log('Starting the search for state');
    const query = `
        select
            s.id,
            s.name
        from state s
        where
            s.name = ?`;
    const values = [stateName];

    return new Promise((resolve, reject) => {
        connection.query(query, values, (err, res) => {
            if(err) {
                console.log('Error fetching an state: ', err);
                reject(err);
            } else {
                console.log('Success fetching an state');
                resolve(res.length > 0 ? res[0] : null);
            }
        });
    });
};

const createState = async (stateName) => {
    console.log('Starting the creation of a state');
    const query = `insert into state (name) values (?)`;
    const values = [stateName];

    return new Promise ((resolve, reject) => {
        connection.execute(query, values, (err, res) => {
            if(err) {
                console.log('Error creating an state: ', err);
                reject(err);
            } else {
                console.log('Success creating an state');
                resolve( { id: res.insertId, name: stateName });
            }
        });
    });
}


module.exports = {
    getState,
    createState
}