const connection = require('../../connector/database-connector');

const getAllUserProfile = async () => {

    console.log('Starting the search for user profiles');

    const query = `
        select
            u.id,
            u.name user_name,
            case
                when u.cnpj is not null then 'juridical'
                else 'physical'
            end type,
            u.cnpj,
            u.cpf,
            u.phone,
            u.cell_phone,
            u.email,
            st.postal_code,
            st.name street_name,
            st.number,
            st.complement,
            c.name city_name,
            st.neighborhood,
            s.name state_name
        from user u
        inner join street st on u.street_id = st.id
        inner join city c on st.city_id = c.id
        inner join state s on c.state_id = s.id
        where
            u.deleted_at is null
        order by
            u.name`;

    return new Promise((resolve, reject) => {
        connection.query(query, (err, res) => {
            if(err) {
                console.log('Error fetching a user profiles: ', err);
                reject(err);
            } else {
                console.log('Success fetching a user profiles');
                resolve(res.length > 0 ? res : null);
            }
        });
    });
};

const getUserProfile = async (userId) => {

    console.log('Starting the search for user profile');

    const query = `
        select
            u.id,
            u.name user_name,
            case
                when u.cnpj is not null then 'juridical'
                else 'physical'
            end type,
            u.cnpj,
            u.cpf,
            u.phone,
            u.cell_phone,
            u.email,
            st.postal_code,
            st.name street_name,
            st.number,
            st.complement,
            c.name city_name,
            st.neighborhood,
            s.name state_name
        from user u
        inner join street st on u.street_id = st.id
        inner join city c on st.city_id = c.id
        inner join state s on c.state_id = s.id
        where
            u.deleted_at is null
            and u.id = ?
        order by
            u.name`;

    const values = [userId];

    return new Promise((resolve, reject) => {
        connection.query(query, values, (err, res) => {
            if(err) {
                console.log('Error fetching a user profile: ', err);
                reject(err);
            } else {
                console.log('Success fetching a user profile');
                resolve(res.length > 0 ? res : null);
            }
        });
    });
};

const createUserProfile = async (name, phone=null, cellPhone=null, email, cpf, cnpj=null, streetId) => {
    console.log('Starting the creation of a user profile');
    const query = `insert into user (name, phone, cell_phone, email, cpf, cnpj, street_id) values (?, ?, ?, ?, ?, ?, ?)`;
    const values = [name, phone, cellPhone, email, cpf, cnpj, streetId];

    return new Promise ((resolve, reject) => {
        connection.execute(query, values, (err, res) => {
            if(err) {
                console.log('Error creating a user profile: ', err);
                reject(err);
            } else {
                console.log('Success creating a user profile');
                resolve( { id: res.insertId, name: name });
            }
        });
    });
}

const updateUserProfile = async (userId, name, phone=null, cellPhone=null, email, cpf, cnpj=null, streetId) => {

    console.log('Starting the update of a user profile');

    const query = `update user set name = ?, phone = ?, cell_phone = ?, email = ?, cpf = ?, cnpj = ?, street_id = ? where id = ?`
    const values = [name, phone, cellPhone, email, cpf, cnpj, streetId, userId];

    return new Promise ((resolve, reject) => {
        connection.execute(query, values, (err, res) => {
            if(err) {
                console.log('Error updating a user profile: ', err);
                reject(err);
            } else {
                console.log('Success updating a user profile');
                resolve( { id: userId, name: name });
            }
        });
    });
}

const deleteUserProfile = async (userId) => {

    console.log('Starting the deletion of a user profile');

    const query = `update user set deleted_at = now() where id = ?`
    const values = [userId];

    return new Promise ((resolve, reject) => {
        connection.execute(query, values, (err, res) => {
            if(err) {
                console.log('Error deleting a user profile: ', err);
                reject(err);
            } else {
                console.log('Success deleting a user profile');
                resolve( { id: userId });
            }
        });
    });
}

module.exports = {
    getAllUserProfile,
    createUserProfile,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile
}
