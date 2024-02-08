const client = require('../db-connect');

// async function selectCustomer(id) {
//     const sql = "SELECT * FROM customer WHERE customer_id=$1"
//     const values = [customer_id]; 


//     const result = await client.query(sql, values);

//     return result.rows[0];
// }

async function selectCustomerbyUsername(username) {
    const sql = "SELECT * FROM customer WHERE username=$1"
    const values = [username]; 


    const result = await client.query(sql, values);

    return result.rows[0];
}

async function selectCustomerbyPassword(password) {
    const sql = "SELECT * FROM customer WHERE password=$1"
    const values = [password]; 


    const result = await client.query(sql, values);

    return result.rows[0];
}

async function insertCustomer(customer) {
    const sql = "INSERT INTO customer VALUES (default,$1,$2,$3,$4,$5) RETURNING *"
    const values = [customer.username, customer.password, customer.firstname, customer.lastname,customer.order_id];

    const result = await client.query(sql, values);

    return result.rows[0];
}


module.exports={

    // getAllMovies:selectAllMovies,
    // getUserById : selectCustomer,
    createCustomerById : insertCustomer,
    getUserByUsername: selectCustomerbyUsername,
    getUserByPassword:selectCustomerbyPassword
    // updateMovieById :updateMovie,
    // deleteMovieById :deleteMovie

}

