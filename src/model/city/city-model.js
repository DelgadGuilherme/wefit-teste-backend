const connection = require('../../connector/database-connector');

const getCity = async (cityName, stateId) => {
    console.log('Starting the search for city');
    const query = `
        select
            c.id,
            c.name
        from city c
        where
            c.name = ?
            and c.state_id = ?`;
    const values = [cityName, stateId];

    return new Promise((resolve, reject) => {
        connection.query(query, values, (err, res) => {
            if(err) {
                console.log('Error fetching an city: ', err);
                reject(err);
            } else {
                console.log('Success fetching an city');
                resolve(res.length > 0 ? res[0] : null);
            }
        });
    });
};

const createCity = async (stateName, stateId) => {
    console.log('Starting the creation of a city');
    const query = `insert into city (state_id, name) values (?, ?)`;
    const values = [stateId, stateName];

    return new Promise ((resolve, reject) => {
        connection.execute(query, values, (err, res) => {
            if(err) {
                console.log('Error creating an city: ', err);
                reject(err);
            } else {
                console.log('Success creating an city');
                resolve( { id: res.insertId, name: stateName });
            }
        });
    });
}


module.exports = {
    getCity,
    createCity
}