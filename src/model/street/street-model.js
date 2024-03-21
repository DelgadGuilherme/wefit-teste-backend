const connection = require('../../connector/database-connector');

const getStreet = async (streetName, number, neighborhood, postalCode, cityId, complement) => {

    console.log('Starting the search for street');

    const values = [streetName, number, cityId, neighborhood, postalCode];

    let query = `
        select
            s.id,
            s.name,
            s.number,
            s.neighborhood,
            s.postal_code,
            s.complement
        from street s
        where
            s.name = ?
            and s.number = ?
            and s.city_id = ?
            and s.neighborhood = ?
            and s.postal_code = ?`;

    if(complement) {
        console.log(complement);
        values.push(complement);
        query =
            `${query}
             and s.complement = ?`
    } else {
        query =
            `${query}
             and s.complement is null`
    }

    return new Promise((resolve, reject) => {
        connection.query(query, values, (err, res) => {
            if(err) {
                console.log('Error fetching an street: ', err);
                reject(err);
            } else {
                console.log('Success fetching an street');
                resolve(res.length > 0 ? res[0] : null);
            }
        });
    });
};

const createStreet = async (streetName, number, neighborhood, postalCode, cityId,  complement=null) => {
    console.log('Starting the creation of a street');
    const query = `insert into street (city_id, name, number, neighborhood, postal_code, complement) values (?, ?, ?, ?, ?, ?)`;
    const values = [cityId, streetName, number, neighborhood, postalCode, complement];

    return new Promise ((resolve, reject) => {
        connection.execute(query, values, (err, res) => {
            if(err) {
                console.log('Error creating an street: ', err);
                reject(err);
            } else {
                console.log('Success creating an street');
                resolve( { id: res.insertId, name: streetName });
            }
        });
    });
}


module.exports = {
    getStreet,
    createStreet
}