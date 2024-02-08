const client = require('../db-connect');

async function helloWold(){
    const res = await client.query('Select $1::text as message', ['Hello World']);
    console.log(res.rows[0].message);

}


module.exports={
    sayHello: helloWold
}