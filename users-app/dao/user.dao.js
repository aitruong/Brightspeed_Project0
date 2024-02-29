const client = require('../db-connect');


    async function selectAllUsers(){
        const sql = "SELECT * FROM users";
        const result = await client.query(sql);
        console.log(result.rows);
          
        return result.rows.map(row=> convertUserData(row));
    }


    function convertUserData(data) {
        if (!data || data == Object.keys(data).length === 0) {
            return {};
        }
    
        return {
            user_id: data.user_id,
            role: data.role,
            username: data.username,
            password: data.password,
            firstname:data.firstname,
            lastname:data.lastname,
            address:data.address
            
        }
    }

    async function selectUser(user_id) {
        const sql = "SELECT * FROM users WHERE user_id=$1"
        const values = [user_id]; 
    
    
        const result = await client.query(sql, values);
    
        return convertUserData(result.rows[0]);
    }


    async function insertUser(user) {
        const sql = "INSERT INTO users VALUES (default,$1,$2,$3,$4,$5,$6) RETURNING *"
        const values = [user.role,user.username,user.password,user.firstname,user.lastname,user.address];
    
        const result = await client.query(sql, values);
    
        return convertUserData(result.rows[0]);
    }

    async function updateUser(user) {
        const sql = "UPDATE users SET role=$1, username= $2, password=$3, firstname=$4, lastname=$5,address=$6 WHERE user_id = $7 RETURNING *";
        const values = [user.role,user.username,user.password,user.firstname,user.lastname,user.address,user.user_id];
    
        const result = await client.query(sql, values);
    
        return convertUserData(result.rows[0]);
    }
    
    async function deleteUser(user_id) {
        const sql = "DELETE FROM users WHERE user_id=$1 RETURNING *";
        const values = [user_id];
    
        const result = await client.query(sql, values);
    
        return convertUserData(result.rows[0]);
    }
    
    
    async function selectUserByUsername(username) {
        const sql = "SELECT * FROM users WHERE username=$1"
        const values = [username]; 
    
    
        const result = await client.query(sql, values);
    
        return convertUserData(result.rows[0]);
    }

    async function selectUserByPassword(password) {
        const sql = "SELECT * FROM users WHERE password=$1"
        const values = [password]; 
    
    
        const result = await client.query(sql, values);
    
        return convertUserData(result.rows[0]);
    }
    
    



module.exports={

    getAllUsers:selectAllUsers,
    getUserById : selectUser,
    getUserByUsername: selectUserByUsername,
    getUserByPassword: selectUserByPassword,
    createUser : insertUser,
    updateUserById :updateUser,
    deleteUserById :deleteUser

}