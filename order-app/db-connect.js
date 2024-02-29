const {Client} = require ('pg');
const client = new Client({
    host: '/cloudsql/movie-rental-414417:us-central1:postgres',
    port : 5432,
    database: 'order-service',
    user:'postgres',
    password: 'Vietnam67!'



});

(async function startup(){
    await client.connect();
})();

module.exports =client;