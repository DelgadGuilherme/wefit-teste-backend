const connection = require('../../connector/database-connector');

const getAllUserProfile = async (result) => {
    console.log('Starting the search for user profiles');
    const query = `
        select
            u.name user_name,
            case
                when u.cnpj is null then 'physical'
                else 'juridical'
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

    connection.execute(query, (err, res) => {
        if(err) {
            console.log('Error fetching all user profiles: ', err);
            result(err, null);
        } else {
            console.log('Success fetching all user profiles');
            result(null, res);
        }
    });
};

module.exports = {
    getAllUserProfile
}
