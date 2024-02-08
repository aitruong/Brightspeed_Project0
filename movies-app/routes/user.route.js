// const express =require('express');
// const userRoutes = express.Router();
// const userDAO = require('../dao/user.dao');

// // userRoutes.post("/register", async function (req, res) {
// //     const { username,password,firstname,lastname } = req.body;
// //     const existUser = await userDAO.getUserByUsername(request.body.username);
// //     if (alreadyExistsUser) {
// //         return res.status(409).json({ message: "User with email already exists!" });
// //       }
// //     // //Validate
// //     // if (!req.body || req.body == {}) {
// //     //     res.status(400).send();
// //     //     return;
// //     // }
// //     //Add it to our database
// //     const user = await userDAO.createCustomerById(req.body);
// //     //As a form of Confirmation, let's send back the added employee.
// //     res.send(user);
// // })

// userRoutes.post("/:id", async function (req, res) {

//     const user = await userDAO.getUserById(req.params.id);

//     if (user) {
//         res.send(user);
//     } else {
//         res.status(404).send("User Not Found")
//     }
//     console.log(user)
// });

// module.exports = userRoutes;