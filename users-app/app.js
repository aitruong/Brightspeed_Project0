const express =require ('express');
const cors = require('cors');
// const homeRoutes = require("./routes/home.routes");
const userRoutes= require('./routes/user.route');
// const userRoutes =require("./routes/user.route");

const userDAO = require ("./dao/user.dao");
// const session = require('express-session');

const app=express();
const port =8080;

app.use(express.json());
app.use(cors());
// const corsOptions ={
//     origin:'*', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200,
//  }
//  app.use(cors(corsOptions)) //
// app.use(session({
//     secret: 'user_id',
//     resave : false,
//     saveUninitialized :false,

// }));


// app.use("/",homeRoutes);
app.use("/users",userRoutes);

// app.use("/",userRoutes);
// app.post("users/register", async function (req, res) {
//     const { customer_id,username,password,firstname,lastname } = req.body;
//     const existUser = await userDAO.getUserByUsername(req.body.username);
//     if (existUser) {
//         return res.status(409).json({ message: "User with email already exists!" });
//       }
//     // //Validate
//     // if (!req.body || req.body == {}) {
//     //     res.status(400).send();
//     //     return;
//     // }
//     //Add it to our database
//     // const usernameDao = await userDAO.getUserByUsername(req.body.username);
//     // const passwordDao =await userDAO.getUserByPassword(req.body.password);
//     const newUser = await userDAO.createCustomerById(req.body)
//     //As a form of Confirmation, let's send back the added employee.
//     res.send(newUser);
// })



// app.get('/',(req,res)=>{
//     const sessionData =req.session;
// })


// app.post('/login',(req,res)=>{
//     const {username,password}= req.body;
//     // const usernameDao =  userDAO.getUserByUsername(req.body.username);
//     // const passwordDao = userDAO.getUserByPassword(req.body.password);

//     if(username & password){
//         req.session.isLoggedIn =true;
//         // req.session.username =username;
//         res.redirect('/movies');
//     }else {
//         res.redirect('/login');
//     }
// });


// app.post('users/login', function(request, response) {
//     let username = request.body.username;
// 	let password = request.body.password;
// 	let usernameDao = userDAO.getUserByUsername(username);
//     let passwordDao = userDAO.getUserByPassword(password);
//     if(usernameDao && passwordDao){
//         request.session.loggedin = true;
//         request.session.username = username;
//         // Redirect to home page
//         response.redirect('/movies');
//     } else if(usernameDao="admin"){
//         request.session.loggedin = true;
//         request.session.username = username;
//         // Redirect to home page
//         response.redirect('/orders');
        
//     }
//     else {
//         response.send('Incorrect Username and/or Password!');
//     }	
//     response.end();		

    
// });



app.listen(port,()=>{
    console.log(`movies-app is listening on port ${port}`);
    console.log(`You can start using the app at: http://localhost:${port}/`);

})

// app.listen(3002, 'localhost'); // or server.listen(3001, '0.0.0.0'); for all interfaces
// app.on('listening', function() {
//     console.log('Express server started on port %s at %s', app.address().port, app.address().address);
// });