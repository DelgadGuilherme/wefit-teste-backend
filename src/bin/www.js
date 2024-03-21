const app = require('../../app');
require('dotenv').config();

const port = process.env.PORT || '4568';

app.listen(port, () => console.log(`Server running or port ${port}`));