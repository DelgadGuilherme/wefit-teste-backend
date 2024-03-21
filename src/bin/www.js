const app = require('../../app');
require('dotenv').config();

const tables = require('../data-base/tables');
const databaseConnector = require('../connector/database-connector');
const port = process.env.PORT || '4568';

try {
    databaseConnector.connect(error => {
        if (error) {
            throw error;
        } else {
            console.log('Connection successful');
            tables.init(databaseConnector);
            app.listen(port, () => console.log(`Server running or port ${port}`));
        }
    });
} catch (error) {
    console.error('Error connecting to the database:', error);
}