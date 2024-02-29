const express =require('express');
const orderRoutes = express.Router();
const orderDAO = require('../dao/order.dao');

//Get All Movies
orderRoutes.get('/',async function(req,res){
    const rows = await orderDAO.getAllOrders();
    res.send(rows);
});

orderRoutes.get("/:id", async function (req, res) {

    const order = await orderDAO.getOrderById(req.params.id);

    if (order) {
        res.send(order);
    } else {
        res.status(404).send("Order Not Found")
    }
});

orderRoutes.post("/", async function (req, res) {
    //Validate
    if (!req.body || req.body == {}) {
        res.status(400).send();
        return;
    }
    //Add it to our database
    const order = await orderDAO.createOrder(req.body);
    //As a form of Confirmation, let's send back the added employee.
    res.send(order);
})

orderRoutes.put("/:id", async function (req, res) {
    const id = req.params.id;
    const body = req.body;
    //Changing an Object's property's (member's) value is NOT the same thing
    //as changing the entire Object. Therefore, const will not stop this. And that's a good thing.
    body.id = id;
    //^we are resetting the ID in the body to make sure it matches what was in the URL.

    const order = await orderDAO.updateOrderById(body);

    if (!order || order == Object.keys(order).length === 0) {
        res.status(404).send("Order Not Found");
    } else {
        res.send(order);
    }
});

orderRoutes.delete("/:id", async function (req, res) {
    const id = req.params.id;

    const order = await orderDAO.deleteOrderById(id);

    if (!order || Object.keys(order).length === 0) {
        res.status(404).send("Order Not Found");
    } else {
        res.status(204).send();
    }
});




module.exports = orderRoutes;