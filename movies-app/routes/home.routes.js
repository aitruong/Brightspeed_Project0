const express = require ('express');
const homeRoutes = express.Router();
const homeDAO = require ('../dao/home.dao');


homeRoutes.get('/',(req,res)=>{
    res.send("Hello World!");

})

homeRoutes.get('/hello',(req,res)=>{
    homeDAO.sayHello();
    res.send("Success");
})

module.exports =homeRoutes;