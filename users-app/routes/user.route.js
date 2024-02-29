const express =require('express');
const userRoutes = express.Router();
const userDAO = require('../dao/user.dao');

//Get All Movies
userRoutes.get('/',async function(req,res){
    const rows = await userDAO.getAllUsers();
    res.send(rows);
});

userRoutes.get("/:id", async function (req, res) {

    const user = await userDAO.getUserById(req.params.id);

    if (user) {
        res.send(user);
    } else {
        res.status(404).send("User Not Found")
    }
});

userRoutes.post("/", async function (req, res) {
    //Validate
    if (!req.body || req.body == {}) {
        res.status(400).send();
        return;
    }
    //Add it to our database
    const user = await userDAO.createUser(req.body);
    //As a form of Confirmation, let's send back the added employee.
    res.send(user);
})

userRoutes.put("/:id", async function (req, res) {
    const id = req.params.id;
    const body = req.body;
    //Changing an Object's property's (member's) value is NOT the same thing
    //as changing the entire Object. Therefore, const will not stop this. And that's a good thing.
    body.id = id;
    //^we are resetting the ID in the body to make sure it matches what was in the URL.

    const user = await userDAO.updateUserById(body);

    if (!user|| user == Object.keys(user).length === 0) {
        res.status(404).send("User Not Found");
    } else {
        res.send(user);
    }
});

userRoutes.delete("/:id", async function (req, res) {
    const id = req.params.id;

    const user = await userDAO.deleteUserById(id);

    if (!user || Object.keys(user).length === 0) {
        res.status(404).send("User Not Found");
    } else {
        res.status(204).send();
    }
});

userRoutes.post("/login",async function(request, response) {
        // let username = request.body.username;
    	// let password = request.body.password;
    	const  username=await userDAO.getUserByUsername(request.body.username);
        let password = await userDAO.getUserByPassword(request.body.password);
        console.log(username);
        console.log(password);
        if(username =="admin" && password=="admin"){
            // request.session.loggedin = true;
            // request.session.username = username;
            response.send(username);
            // Redirect to home page
            // response.redirect('/movies');
        } else if(username){
            // request.session.loggedin = true;
            // request.session.username = username;
            response.send(username);
            // Redirect to home page
            // response.redirect('/orders');
            
        }
        else {
            response.send('Incorrect Username and/or Password!');
        }	
        response.end();		
    
        
    });

    userRoutes.post("/register", async function (req, res) {
        const { username,password,firstname,lastname } = req.body;
        console.log(req.body.username);
        const existUser = await userDAO.getUserByUsername(req.body.username);
        console.log(existUser);
        if (!existUser || existUser == {}) {
            return res.status(409).json({ message: "User with email already exists!" });
          }
        // //Validate
        // if (!req.body || req.body == {}) {
        //     res.status(400).send();
        //     return;
        // }
        //Add it to our database
        // const usernameDao = await userDAO.getUserByUsername(req.body.username);
        // const passwordDao =await userDAO.getUserByPassword(req.body.password);
        const newUser = await userDAO.createUser(req.body)
        //As a form of Confirmation, let's send back the added employee.
        res.send(newUser);
    })




module.exports = userRoutes;