const {Client} = require ('pg');
const client = new Client({
    host: '35.238.90.38',
    port : 5432,
    database: 'postgres',
    user:'postgres',
    password: 'Vietnam67!'



});

(async function startup(){
    await client.connect();
})();

module.exports =client;