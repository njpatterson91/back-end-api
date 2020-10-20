require('dotenv').config();

const server = require('./api/server.js');

const port = process.env.PORT || 7500;
server.listen(port, () => {
    console.log(`\nServer is cooking at ${port}\n`)
});