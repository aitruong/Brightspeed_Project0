const client = require('../db-connect');


    async function selectAllOrders(){
        const sql = "SELECT * FROM orders";
        const result = await client.query(sql);
        console.log(result.rows);
          
        return result.rows.map(row=> convertOrderData(row));
    }


    function convertOrderData(data) {
        if (!data || data == Object.keys(data).length === 0) {
            return {};
        }
    
        return {
            order_id: data.order_id,
            email: data.email,
            total: Number(data.total),
            paid: data.paid,
            status:data.status
            
        }
    }

    async function selectOrder(order_id) {
        const sql = "SELECT * FROM orders WHERE order_id=$1"
        const values = [order_id]; 
    
    
        const result = await client.query(sql, values);
    
        return convertOrderData(result.rows[0]);
    }


    async function insertOrder(order) {
        const sql = "INSERT INTO orders VALUES (default,$1,$2,$3,$4) RETURNING *"
        const values = [order.email,order.total,order.paid,order.status];
    
        const result = await client.query(sql, values);
    
        return convertOrderData(result.rows[0]);
    }

    async function updateOrder(order) {
        const sql = "UPDATE orders SET email=$1, total= $2, paid=$3, status=$4 WHERE order_id = $5 RETURNING *";
        const values = [order.email, order.total, order.paid, order.status, order.order_id];
    
        const result = await client.query(sql, values);
    
        return convertOrderData(result.rows[0]);
    }
    
    async function deleteOrder(order_id) {
        const sql = "DELETE FROM orders WHERE order_id=$1 RETURNING *";
        const values = [order_id];
    
        const result = await client.query(sql, values);
    
        return convertOrderData(result.rows[0]);
    }
    
    
    
    
    



module.exports={

    getAllOrders:selectAllOrders,
    getOrderById : selectOrder,
    createOrder : insertOrder,
    updateOrderById :updateOrder,
    deleteOrderById :deleteOrder

}