const expres = require("express");
const { placeOrder, getOrder, orderStatusChange, getCanteenOrder } = require("./orderHandler")
const orderRoute = expres.Router();

orderRoute.post('/placeOrder', async (req, res)=>{

    const result = await placeOrder(req.body.canteenName, req.body.orderList, req.body.regNum, req.body.phoneNum)
    if(result){
        res.status(200).send("Order Placed successfully");
    }
    else{
        res.status(500).send("Failed to place order");
    }
}) 

orderRoute.get('/getOrder', async(req, res) => {

    const result = await getOrder(req.body.regNum)
    res.status(200).send(result)
})

orderRoute.post('/changeStatus', async(req, res) => {

    await orderStatusChange(req.body.canteenName, req.body.regNum, req.body.status);
    res.status(200)
})

orderRoute.get('/ordersPlaced', async(req, res) => {

    const result = getCanteenOrder(req.body.canteenName)
    res.status(200).send(result)
})

module.exports = orderRoute